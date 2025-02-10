import tensorflow as tf
import numpy as np
import json
model = tf.keras.models.load_model('my_model.keras')
x_train = []
y_train = []


# with open('feedback.json', 'r') as file:
#     data = json.load(file)

# # Process each entry in the JSON array
# for entry in data:
#     # Convert image data to a numpy array and reshape to the original image dimensions (e.g., 28x28)
    
#     x_train.append(entry['image_data'])

#     # Store the corresponding label
#     y_train.append(int(entry['lable']))

# # Convert lists to numpy arrays
# x_train = np.array(x_train).reshape(-1, 784)
# y_train = np.array(y_train)

# print(f"x_train dtype: {np.array(x_train).dtype}")
# print(f"y_train dtype: {np.array(y_train).dtype}")

# model.fit(x_train,y_train, epochs=3)

# with open("feedback.json",'w') as file:
#     json.dump([],file)


# model.save('my_updated_model.keras')


print(model.summary())