// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs text detection on the image file
client.safeSearchDetection('dog.jpg', {verbose: true})
    .then(([detections]) => {
        for (let [key, value] of Object.entries(detections.safeSearchAnnotation)) {
            console.log(key +'-'+ value);
        }
    })
    .catch(err => console.error('Error:', err));