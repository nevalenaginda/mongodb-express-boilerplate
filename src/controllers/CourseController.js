import httpStatusConstants from '../constants/HttpStatusConstants';
import CourseService from '../services/CourseService';

const { HTTP_STATUS_OK } = httpStatusConstants;
const {
  add,
  edit,
  fetchAll,
  fetchById,
  remove
} = CourseService;

/*
  Course controller
 */
class CourseController {
  static fetchAll = async (req, res, next) => {
    try {
      const courses = await fetchAll();
      res.status(HTTP_STATUS_OK);
      res.json({
        data: courses
      });
    } catch (error) {
      next(error);
    }
  };

  static fetchById = async (req, res, next) => {
    const courseId = req.params.id;

    try {
      const course = await fetchById(courseId);
      res.status(HTTP_STATUS_OK);
      res.json({
        data: course
      });
    } catch (error) {
      next(error);
    }
  };

  static add = async (req, res, next) => {
    try {
      const savedCourse = await add(req.body);
      res.json(savedCourse);
    } catch (error) {
      next(error);
    }
  };

  static edit = async (req, res, next) => {
    try {
      const { params, body } = req;
      const updatedCourse = await edit(params, body);
      res.json(updatedCourse);
    } catch (error) {
      next(error);
    }
  };

  static remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCourse = await remove(id);
      res.json(deletedCourse);
    } catch (error) {
      next(error);
    }
  }
}

export default CourseController;
