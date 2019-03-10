// ref: https://cloud.google.com/vision/docs/face-tutorial
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const fs = require('fs');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs face detection on the image file
async function detectFaces(inputFile) {
    // Make a call to the Vision API to detect the faces
    const request = {image: {source: {filename: inputFile}}};
    const results = await client.faceDetection(request);
    const faces = results[0].faceAnnotations;
    const numFaces = faces.length;

    // prediction of all likelihood
    console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'} with following details:\n.`);
    console.log(`Joy Likelihood: ${faces[0].joyLikelihood}`);
    console.log(`Sorrow Likelihood: ${faces[0].sorrowLikelihood}`);
    console.log(`Surprise Likelihood: ${faces[0].surpriseLikelihood}`);
    console.log(`Anger Likelihood: ${faces[0].angerLikelihood}`);
    console.log(`Head wear Likelihood: ${faces[0].headwearLikelihood}`);
    console.log(`Under Exposed Likelihood: ${faces[0].underExposedLikelihood}`);
    console.log(`Blurred Likelihood: ${faces[0].blurredLikelihood}`);

    // checking prediction confidence
    faces.forEach((face, i) => {
        console.log(`How sure are we that there is a face? ${face.detectionConfidence}%`);
        console.log(`Are we certain the face looks happy? ${face.joyLikelihood === 'VERY_LIKELY' ? 'Yes' : 'Not really'}`);
        console.log(`Are we certain the face looks angry? ${face.angerLikelihood === 'VERY_LIKELY' ? 'Yes' : 'Not really'}`);
    });

    return faces;
}

async function main() {
    const faces = await detectFaces('angry.jpg');
    if (faces.length > 0) {
        console.log('There is face in image...');
    } else {
        console.log('There is no face in image...');
    }
}

// run main app
main();
