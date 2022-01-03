import errorHandlerUtils from '../utils/ErrorHandlerUtils';
import httpStatusConstants from '../constants/HttpStatusConstants';
import httpMessageConstants from '../constants/HttpMessageConstants';
import Course from '../models/Course';
import CourseRepository from '../repositories/CourseRepository';

const { createError } = errorHandlerUtils;
const { COURSE_NOT_FOUND_MESSAGE } = httpMessageConstants;
const { HTTP_STATUS_NOT_FOUND } = httpStatusConstants;
const {
  add,
  edit,
  fetchAll,
  fetchById,
  remove
} = CourseRepository;

/*
  Course service
 */
class CourseService {
  static fetchAll = async () => {
    return await fetchAll();
  };

  static fetchById = async (courseId) => {
    const course = await fetchById(courseId);

    if (!course) {
      throw createError(HTTP_STATUS_NOT_FOUND, COURSE_NOT_FOUND_MESSAGE);
    }

    return course;
  };

  static add = async (body) => {
    const { name } = body;
    const course = new Course({
      name
    });

    return await add(course);
  };

  static edit = async (params, body) => {
    const { id } = params;
    const { name } = body;

    const updatedCourse = await edit(id, name);

    if (!updatedCourse) {
      throw createError(HTTP_STATUS_NOT_FOUND, COURSE_NOT_FOUND_MESSAGE);
    }

    return updatedCourse;
  };

  static remove = async (id) => {
    const deletedCourse = await remove(id);

    if (!deletedCourse) {
      throw createError(HTTP_STATUS_NOT_FOUND, COURSE_NOT_FOUND_MESSAGE);
    }

    return deletedCourse;
  }
}

export default CourseService;
