const gce = require('@google-cloud/compute')({
    projectId: 'technocracy-157812'
});

const zone = gce.zone('us-central1-c');

console.log('Getting your VMs...');

zone.getVMs().then((data) => {
    data[0].forEach((vm) => {
        console.log('Found a VM called ', vm.name);
    });
    console.log('Done.');
});

// error ref: https://stackoverflow.com/questions/42043611/could-not-load-the-default-credentials-node-js-google-compute-engine-tutorial