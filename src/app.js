import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import errorHandler from './middlewares/ErrorHandler';
import indexRoutes from './routes';
import loggerHandler from './middlewares/LoggerHandler';

require('dotenv').config();

const app = express();

app.use(express.json(), loggerHandler(app));

indexRoutes(app);

app.use(errorHandler);

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
// Listening
const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port);

const shutdownProcess = () => {
  // eslint-disable-next-line no-console
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('closing remaining connection');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdownProcess);
process.on('SIGINT', shutdownProcess);

export default app;
