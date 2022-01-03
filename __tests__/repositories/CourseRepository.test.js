import { connect, closeDatabase, clearDatabase } from '../../src/utils/DBTestUtils';
import CourseRepository from '../../src/repositories/CourseRepository';
import CourseModel from '../../src/models/Course';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('CourseRepository', () => {
  const mockCourse = {
    name: 'iPhone 11',
    projects: '5e6a09fcb8e2990009239605'
  };

  const mockOtherCourse = {
    name: 'iPhone X',
    projects: '5e6a09fcb8e2990009239606'
  };

  describe('#fetchById', () => {
    it('should retrieve the correct course if id matches', async () => {
      const course = new CourseModel(mockCourse);
      const savedCourse = await course.save();

      const foundCourse = await CourseRepository.fetchById(savedCourse.id);

      expect(foundCourse.id).toBe(savedCourse.id);
      expect(foundCourse.name).toBe(savedCourse.name);
      expect(foundCourse.date).toStrictEqual(savedCourse.date);
      expect(foundCourse.projects).toStrictEqual(savedCourse.projects);
    });
  });

  describe('#fetchAll', () => {
    it('should retrieve the correct saved courses', async () => {
      const course = new CourseModel(mockCourse);
      const otherCourse = new CourseModel(mockOtherCourse);
      const createdCourse = await course.save(mockCourse);
      const createdOtherCourse = await otherCourse.save(mockOtherCourse);

      const savedCourse = await CourseRepository.fetchAll();

      expect(savedCourse).toHaveLength(2);
      expect(savedCourse[0].id).toBe(createdCourse.id);
      expect(savedCourse[1].id).toBe(createdOtherCourse.id);
      expect(savedCourse[0].projects).not.toBeNull();
      expect(savedCourse[1].projects).not.toBeNull();
    });
  });

  describe('#add', () => {
    it('should make new course entries', async () => {
      const course = new CourseModel(mockCourse);

      const savedCourse = await CourseRepository.add(course);

      expect(savedCourse).toBe(course);
      expect(!savedCourse.isNew);
    });
  });

  describe('#remove', () => {
    it('should remove correct course based on course id', async () => {
      const course = new CourseModel(mockCourse);

      const savedCourse = await CourseRepository.add(course);
      await CourseRepository.remove(savedCourse.id);
      const fetchedCourse = await CourseRepository.fetchById(savedCourse.id);

      expect(fetchedCourse).toBeNull();
    });
  });

  describe('#edit', () => {
    it('should edit correct course name based on course id', async () => {
      const course = new CourseModel(mockCourse);

      const savedCourse = await CourseRepository.add(course);
      await CourseRepository.edit(savedCourse.id, 'Iphone 6S');
      const fetchedCourse = await CourseRepository.fetchById(savedCourse.id);

      expect(fetchedCourse.name).toBe('Iphone 6S');
    });
  });
});
