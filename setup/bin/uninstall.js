const Service = require('./lib/node-windows').Service;

// Create a new service object
const svc = new Service({
    name: 'GCMS API Service Accounting',
    script: require('path').join(__dirname, '../../dist', 'app.js'),
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', () => {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();

// Create a new service object
const docSvc = new Service({
    name: 'GCMS API Doc Service Accounting',
    script: require('path').join(__dirname, '../../mock', 'index.js'),
});

// Listen for the "uninstall" event so we know when it's done.
docSvc.on('uninstall', () => {
    console.log('Uninstall complete.');
    console.log('The service exists: ', docSvc.exists);
});

// Uninstall the service.
docSvc.uninstall();