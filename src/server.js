import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Accident Thai Visualize Api',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

const start = async () => {
  try {
    const PORT = process.env.PORT || 9000;

    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 3000,
    });
    await app.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`🚀 server listening on ${PORT}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export { start };

export default app;
