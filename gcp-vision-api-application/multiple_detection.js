// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs text detection on the image file
client.objectLocalization('protest.JPG')
    .then(result => {
        const objects = result[0].localizedObjectAnnotations;
        objects.forEach(object => {
            console.log(`Name: ${object.name}`);
            console.log(`Confidence: ${object.score}`);
        });
    })
    .catch(err => console.error('Error:', err));