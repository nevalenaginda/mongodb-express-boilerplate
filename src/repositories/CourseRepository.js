import mongoose from 'mongoose';
import Course from '../models/Course';

/*
  Course repository
 */
class CourseRepository {
  static fetchAll = async () => {
    return await Course.find()
      .populate({ path: 'projects', select: 'name' });
  };

  static fetchById = async (courseId) => {
    return Course.findById(courseId);
  };

  static add = async (course) => {
    return Course.create(course);
  };

  static edit = async (id, name) => {
    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
      const result = await Course.findOneAndUpdate(
        { _id: id },
        { $set: { name } },
        {
          new: true,
          useFindAndModify: false,
          session
        }
      );

      await session.commitTransaction();
      return { from: result };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };

  static remove = (id) => {
    return Course.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
  }
}

export default CourseRepository;
