const canvas = document.getElementById('canvas');
const ctx = canvas?.getContext('2d');
let isDrawing = false;

let feedback = document.getElementById('feedback')
    if (canvas && ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // ctx.lineCap = 'round';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 10;

      // Add event listeners for drawing
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);

      // Functions for drawing
      function startDrawing(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
      }

      function draw(e) {
        if (!isDrawing) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

      function stopDrawing() {
        isDrawing = false;
      }

      // Clear the canvas
      document.getElementById('clr')?.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Reset the black background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        document.getElementById("subs").style.display = "none";
        feedback.style.display = 'none'
      });

      // Placeholder for predict function
      document.getElementById('pred')?.addEventListener('click', (e) => {
        e.preventDefault();
        predict(e);
      });

      function predict(event) {
        console.log("Prediction triggered");
        event.preventDefault(); 
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'digit.png');

        // Send to backend
        fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.digit)
          
            document.getElementById('result').innerText = `Predicted Digit: ${data.digit}`;
            feedback.style.display = 'block'
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
      }
    } else {
      console.error("Canvas or context could not be initialized.");
    }

document.getElementById('right').addEventListener('click',()=>{
  feedback.style.display = 'none'
})
document.getElementById('wrong').addEventListener('click',()=>{
  feedback.style.display = 'none'
  document.getElementById('subs').style.display = 'block'
})

document.getElementById('sub').addEventListener('click',()=>{
  value = document.getElementById('feedbox').value
  sendfeed(value)
})



async function sendfeed(value){
  console.log("feedback sent")
  
  let blob = await new Promise((resolve) => canvas.toBlob(resolve))

  if (!blob) throw new Error("failed to create a blob");
  
  formData = new FormData()
  formData.append('image',blob,'digit.png')
  formData.append('feed',value)

  let response = await fetch('http://127.0.0.1:5000/feedback',{
    method : 'POST',
    body : formData,
  })

  if (!response) {
    throw new Error("error " + response.status)
  }

  let data = await response.json()

  alert(data.message)
  document.getElementById("subs").style.display = "none";

}