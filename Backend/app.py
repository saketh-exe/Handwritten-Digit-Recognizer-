from flask import Flask, request, jsonify
from flask_cors import CORS  
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import json

app = Flask(__name__)
CORS(app) 


model = tf.keras.models.load_model('my_model.keras')

@app.route('/predict', methods=['POST'])
def predict():

    image_data = request.files['image'].read()
    
    image = Image.open(io.BytesIO(image_data)).resize((28, 28), Image.Resampling.LANCZOS).convert('L')  
    image_array = np.array(image) / 255.0  
    image_array = image_array.reshape(1, 784)  

    
    debug_image = (image_array.reshape(28, 28) * 255).astype(np.uint8)  
    Image.fromarray(debug_image).save("debug_image.png")

    
    prediction = model.predict(image_array)
    predicted_digit = np.argmax(prediction)
    print(predicted_digit)
    return jsonify({'digit': int(predicted_digit)})

@app.route('/feedback',methods = ['POST'])
def feedback():
    
    feed_image = request.files['image'].read()
    feed_dig = request.form.get('feed')

    f_image = Image.open(io.BytesIO(feed_image)).resize((28,28),Image.Resampling.LANCZOS).convert('L')
    f_image_array = np.array(f_image)/255.0
    f_image_array = f_image_array.reshape(1,784).tolist()
    
    j_append =  {
        "image_data" : f_image_array,
        "lable" : feed_dig
    }
    try:
        with open('feedback.json','r') as file:
            data = json.load(file)
    except:
        data =[]
    data.append(j_append)


    with open('feedback.json','w') as file :
        json.dump(data,file,indent=4)
    
    
    return jsonify({'message' : "thanks for the feedback"})


if __name__ == '__main__':
    app.run(debug=True)
