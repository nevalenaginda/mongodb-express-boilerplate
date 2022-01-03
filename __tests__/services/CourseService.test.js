import CourseRepository from '../../src/repositories/CourseRepository';
import CourseService from '../../src/services/CourseService';
import errorHandlerUtils from '../../src/utils/ErrorHandlerUtils';

const {
  fetchAll,
  fetchById,
  add,
  edit,
  remove
} = CourseService;

const { createError } = errorHandlerUtils;

jest.mock('../../src/repositories/CourseRepository', () => ({
  fetchAll: jest.fn(),
  fetchById: jest.fn(),
  add: jest.fn(),
  edit: jest.fn(),
  remove: jest.fn()
}));

jest.mock('../../src/models/Course', () => {
  // eslint-disable-next-line func-names
  return function () {
    return {
      id: '5e451c512694a82900cb8c32',
      name: 'Computer & Science',
      date: '2017-02-14T12:51:48.000Z'
    };
  };
});

jest.mock('../../src/utils/ErrorHandlerUtils', () => ({
  createError: jest.fn()
}));

describe('CourseService', () => {
  const courseId = '5e451c512694a82900cb8c32';
  const course = {
    name: 'Computer & Science'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#fetchAll', () => {
    it('should call fetchAll from repository when invoked', () => {
      fetchAll();

      expect(CourseRepository.fetchAll)
        .toHaveBeenCalled();
    });
  });

  describe('#fetchById', () => {
    it('should call fetchById from repository with correct courseId from params when invoked', () => {
      CourseRepository.fetchById.mockReturnValue(course);

      fetchById(courseId);

      expect(CourseRepository.fetchById)
        .toHaveBeenCalledWith(courseId);
    });

    it('should throw error when fetch course with provided id is not found', async () => {
      const error = new Error();
      CourseRepository.fetchById.mockReturnValue(null);
      createError.mockReturnValue(error);

      await expect(fetchById(courseId)).rejects.toThrow(error);
    });
  });

  describe('#add', () => {
    it('should call add from repository with course with correct name from params when invoked', () => {
      const courseWithDate = {
        id: courseId,
        name: course.name,
        date: '2017-02-14T12:51:48.000Z'
      };

      add(course);

      expect(CourseRepository.add)
        .toHaveBeenCalledWith(courseWithDate);
    });
  });

  describe('#edit', () => {
    const newName = 'Statistics 1';
    const mockedParams = { id: courseId };
    const mockedBody = { name: newName };

    it('should call edit from repository with correct id and name from params when invoked', () => {
      const updatedCourse = {
        id: courseId,
        name: newName
      };

      CourseRepository.edit.mockReturnValue(updatedCourse);

      edit(mockedParams, mockedBody);

      expect(CourseRepository.edit)
        .toHaveBeenCalledWith(courseId, newName);
    });

    it('should throw error when edit course with provided id is not found', async () => {
      const error = new Error();
      CourseRepository.edit.mockReturnValue(null);
      createError.mockReturnValue(error);

      await expect(edit(mockedParams, mockedBody)).rejects.toThrow(error);
    });
  });

  describe('#remove', () => {
    it('should call remove from repository with correct id from params when invoked', () => {
      CourseRepository.remove.mockReturnValue(course);

      remove(courseId);

      expect(CourseRepository.remove)
        .toHaveBeenCalledWith(courseId);
    });

    it('should throw error when remove course with provided id is not found', async () => {
      const error = new Error();
      CourseRepository.remove.mockReturnValue(null);
      createError.mockReturnValue(error);

      await expect(remove(courseId)).rejects.toThrow(error);
    });
  });
});
