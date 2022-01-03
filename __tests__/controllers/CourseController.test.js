import request from 'supertest';
import http from 'http';
import express from 'express';
import CourseService from '../../src/services/CourseService';
import indexRoutes from '../../src/routes';
import errorHandler from '../../src/middlewares/ErrorHandler';

const {
  fetchAll: serviceFetchAll,
  fetchById: serviceFetchById,
  add: serviceAdd,
  edit: serviceEdit,
  remove: serviceRemove
} = CourseService;

jest.mock('../../src/services/CourseService', () => ({
  fetchAll: jest.fn(),
  fetchById: jest.fn(),
  add: jest.fn(),
  edit: jest.fn(),
  remove: jest.fn()
}));

describe('CourseController', () => {
  const courseId = '5e451c512694a82900cb8c32';
  const course = {
    id: courseId,
    name: 'Computer & Science',
    date: '2017-02-14T12:51:48.000Z'
  };
  const courses = [course];
  let server;
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    indexRoutes(app);
    app.use(errorHandler);
    server = http.createServer(app);
    server.listen(process.env.TEST_PORT);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => server.close());

  describe('#fetchAll', () => {
    it('should call fetchAll function from course service and return status 200 with list'
      + 'of courses data when invoked', async () => {
      serviceFetchAll.mockResolvedValue(courses);

      await request(app)
        .get('/api/courses')
        .expect(200, {
          data: courses
        });

      expect(serviceFetchAll).toHaveBeenCalled();
    });

    it('should return status 500 when error is caught', async () => {
      const error = new Error();
      serviceFetchAll.mockRejectedValue(error);

      await request(app)
        .get('/api/courses')
        .expect(500);
    });
  });

  describe('#fetchById', () => {
    it('should call fetchById function from course service and return status 200 with data'
      + 'course when invoked', async () => {
      serviceFetchById.mockResolvedValue(course);

      await request(app)
        .get(`/api/courses/${courseId}`)
        .expect(200, {
          data: course
        });

      expect(serviceFetchById).toHaveBeenCalledWith(courseId);
    });

    it('should return status 500 when error is caught', async () => {
      const error = new Error();
      serviceFetchById.mockRejectedValue(error);

      await request(app)
        .get(`/api/courses/${courseId}`)
        .expect(500);
    });
  });

  describe('#add', () => {
    it('should call add function from course service and return status 200 with new course'
      + 'data when invoked', async () => {
      serviceAdd.mockResolvedValue(course);

      await request(app)
        .post('/api/courses')
        .field('name', 'Computer & Science')
        .expect(200, course);

      expect(serviceAdd).toHaveBeenCalled();
    });

    it('should return status 500 when error is caught', async () => {
      const error = new Error();
      serviceAdd.mockRejectedValue(error);

      await request(app)
        .post('/api/courses')
        .field('name', 'Computer & Science')
        .expect(500);
    });
  });

  describe('#edit', () => {
    it('should call edit function from course service and return status 200 with updated '
      + 'course data when invoked', async () => {
      serviceEdit.mockResolvedValue(course);

      await request(app)
        .patch(`/api/courses/${courseId}`)
        .field('name', 'Computer & Science')
        .expect(200, course);

      expect(serviceEdit).toHaveBeenCalled();
    });

    it('should return status 500 when error is caught', async () => {
      const error = new Error();
      serviceEdit.mockRejectedValue(error);

      await request(app)
        .patch(`/api/courses/${courseId}`)
        .field('name', 'Computer & Science')
        .expect(500);
    });
  });

  describe('#remove', () => {
    it('should call remove function from course service when invoked', async () => {
      serviceRemove.mockResolvedValue(course);

      await request(app)
        .delete(`/api/courses/${courseId}`)
        .expect(200, course);

      expect(serviceRemove).toHaveBeenCalled();
    });

    it('should return status 500 when error is caught', async () => {
      const error = new Error();
      serviceRemove.mockRejectedValue(error);

      await request(app)
        .delete(`/api/courses/${courseId}`)
        .expect(500);
    });
  });
});
