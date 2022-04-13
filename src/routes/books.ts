import { Request, Response, Router } from 'express';
import {
  deleteBook,
  getAllBooks,
  postNewBook,
  putUpdateBook,
} from '../controllers/books';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to The Midnight Library');
});

// * Get all books
router.get('/all', getAllBooks);
// * Add New book
router.post('/new', postNewBook);
// * Update book
router.put('/update/:id', putUpdateBook);
// * Delete book
router.delete('/delete/:id', deleteBook);

export default router;
