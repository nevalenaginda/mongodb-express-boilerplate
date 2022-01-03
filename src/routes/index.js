import express from 'express';
import coursesRoute from './CourseRoutes';

const router = express.Router();

const indexRoutes = (app) => {
  app.use('/api', router);
  router.use('/courses', coursesRoute);
};

export default indexRoutes;
