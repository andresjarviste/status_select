import express, {Application} from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";

import Router from './routes'

const PORT = process.env.PORT || 8000;

const app: Application = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );

dotenv.config()

app.use('/api', Router)

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
