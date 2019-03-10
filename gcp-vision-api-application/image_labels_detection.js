// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
client.labelDetection('dog.jpg', {verbose: true})
    .then((results ) => {
        const labels = results[0].labelAnnotations;
        labels.forEach(label => {
            console.log(`Label:${label.description}, Score: ${label.score}`);
        });
    })
    .catch(err => console.error('Error:', err));
