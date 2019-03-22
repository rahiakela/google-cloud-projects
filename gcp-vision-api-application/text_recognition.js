// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs text detection on the image file
client.textDetection('ocr1.PNG', {verbose: true})
    .then(([detections]) => {
        const annotation = detections.textAnnotations[0];
        console.log(`Extracted text from image is: ${annotation ? annotation.description.replace(/\n/g, ' ') : ''}`)
    })
    .catch(err => console.error('Error:', err));

// Performs text detection on the image file
client.textDetection('ocr2.PNG', {verbose: true})
    .then(([detections]) => {
        const annotation = detections.textAnnotations[0];
        console.log(`Extracted text from image is: ${annotation ? annotation.description.replace(/\n/g, ' ') : ''}`)
    })
    .catch(err => console.error('Error:', err));