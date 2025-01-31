const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Signature',
    description: 'API de gestion des signatures électroniques',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    { name: 'Signatures', description: 'Endpoints liés aux signatures' }
  ]
};

const outputFile = './swagger.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
