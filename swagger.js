import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'http://localhost:8000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/user.Route.js','./routes/complain.Routes.js'];



swaggerAutogen()(outputFile, routes, doc);