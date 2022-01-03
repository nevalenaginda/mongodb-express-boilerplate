import express from 'express';
import CourseController from '../controllers/CourseController';

const {
  add,
  edit,
  fetchAll,
  fetchById,
  remove
} = CourseController;

const router = express.Router();

/*
  Course routes
 */
router.get('/', fetchAll);
router.get('/:id', fetchById);
router.post('/', add);
router.patch('/:id', edit);
router.delete('/:id', remove);

export default router;
