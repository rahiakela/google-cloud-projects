// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs text detection on the image file
client.logoDetection('logo4.PNG', {verbose: true})
    .then(([detections]) => {
        detections.logoAnnotations.forEach(annotation => {
            console.log(`Extracted logo text from image is: ${annotation ? annotation.description.replace(/\n/g, ' ') : ''}`);
        });
    })
    .catch(err => console.error('Error:', err));