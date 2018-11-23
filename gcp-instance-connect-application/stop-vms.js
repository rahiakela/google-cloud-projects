const gce = require('@google-cloud/compute')({
    projectId: 'technocracy-157812'
});

const zone = gce.zone('us-central1-c');

console.log('Getting your VMs...');

zone.getVMs().then((data) => {
    data[0].forEach((vm) => {
        console.log('Found a VM called ', vm.name);
        console.log('Stopping ', vm.name, '...');
        vm.stop((err, operation) => {
            operation.on('complete', (err) => {
                console.log('Stopped ', vm.name);
            });
        });
    });
});