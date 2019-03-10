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

async function highlightFaces(inputFile, faces, Canvas) {
    const {promisify} = require('util');
    const readFile = promisify(fs.readFile);
    const image = await readFile(inputFile);
    const Image = Canvas.Image;

    // Open the original image into a canvas
    const img = new Image();
    img.src = image;
    const canvas = new Canvas.Canvas(img.width, img.height);
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);

    // Now draw boxes around all the faces
    context.strokeStyle = 'rgba(0,255,0,0.8)';
    context.lineWidth = '5';

    faces.forEach(face => {
        context.beginPath();
        let origX = 0;
        let origY = 0;
        face.boundingPoly.vertices.forEach((bounds, i) => {
            if (i === 0) {
                origX = bounds.x;
                origY = bounds.y;
            }
            context.lineTo(bounds.x, bounds.y);
        });
        context.lineTo(origX, origY);
        context.stroke();
    });

    // Write the result to a file
    const writeStream = fs.createWriteStream('highlighted');
    const pngStream = canvas.pngStream();

    await new Promise((resolve, reject) => {
        pngStream
            .on('data', chunk => writeStream.write(chunk))
            .on('error', reject)
            .on('end', resolve);
    });
}

async function main() {
    const Canvas = require('canvas');
    const faces = await detectFaces('angry.jpg');
    if (faces.length > 0) {
        console.log('There is face in image...');
    } else {
        console.log('There is no face in image...');
    }

    console.log('Highlighting...');
    await highlightFaces('angry.jpg', faces, Canvas);
    console.log('Finished!');
}

// run main app
main();
