import express from 'express';
import cors from 'cors';
import rootRoute from '@routes/index';
import errorHandler from './expressError';
import expressNotFound from './expressNotFound';
//permite logger todas las rutas cuando sean necesitadas los request
import expressLogger from './expressLogger';
const createServer = () => {
  const app = express();
  //todo lo que venga en el query, nos lo convierte en texto normal
  app.use(express.urlencoded({ extended: true }));
  //meter los logs
  app.use(expressLogger);
  //permite los dominios entrar en esta api
  app.use(cors());
  app.use(express.json());
  //que no sepan que no es express que se esta ejecutando atras
  app.disable('x-powered-by');
  //importa todas las rutas
  app.use('/', rootRoute);
  app.use(expressNotFound);
  app.use(errorHandler);
  return app;
};

export { createServer };
