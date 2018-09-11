const grpc = require('grpc');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.join(__dirname, '..', 'bac.proto');
console.log('path',PROTO_PATH);
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const helloworld = grpc.loadPackageDefinition(packageDefinition).helloworld;

async function main() {
    const client = new helloworld.Greeter('127.0.0.1:50051', grpc.credentials.createInsecure());
	client.countWeight(
        {name:[74,2,23,44,64,67,25]}, function (err, response) {
        console.log( response.results[0].weight);
		
    });
}
main();
