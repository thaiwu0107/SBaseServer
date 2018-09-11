const Service = require('./lib/node-windows').Service;

// Create a new service object
const svc = new Service({
    name: 'GCMS API Service Accounting',
    description: 'The GCMS API Service Accounting.',
    script: require('path').join(__dirname, '../../dist', 'app.js'),
    env: {
        name: "NODE_ENV",
        value: "production"
    },
    wait: 60,
    grow: 0.5,
    maxRetries: 10,
    maxRestarts: 10,
});

// Listen for the "install" event, which indicates the process is available as a service.
svc.on('install', () => {
    console.log('install complete.');
    console.log('The service exists: ', svc.exists);
    svc.start();
});
svc.install();

// Create a new service object
const docSvc = new Service({
    name: 'GCMS API Doc Service Accounting',
    description: 'The GCMS API Doc Service Accounting.',
    script: require('path').join(__dirname, '../../mock', 'index.js'),
    env: {
        name: "NODE_ENV",
        value: "production"
    },
    wait: 60,
    grow: 0.5,
    maxRetries: 10,
    maxRestarts: 10,
});

// Listen for the "install" event, which indicates the process is available as a service.
docSvc.on('install', () => {
    console.log('install complete.');
    console.log('The service exists: ', docSvc.exists);
    docSvc.start();
});
docSvc.install();