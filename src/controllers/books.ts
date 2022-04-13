import { NextFunction, Request, RequestHandler, Response } from 'express';

// import { CustomErrors } from '../middlewares/errors';
import Book from '../models/books';
import { CustomErrors } from '../middlewares/errors';

// * Create a new Review
const postNewBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, pageCount } = req.body;

  try {
    // * validations
    validateBookDetails(title, author, pageCount);

    const newBook = new Book({
      title,
      author,
      pageCount,
    });

    await newBook.save();
    res.json({
      message: 'Added to your library',
      bookId: newBook._id,
    });
  } catch (error) {
    next(error);
  }
};

// * Get All Review
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBooks = await Book.find();
    res.json({
      message: 'All Books',
      allBooks,
    });
  } catch (error) {
    next(error);
  }
};

// * Update a Book
const putUpdateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { title, pageCount, author } = req.body;

    // * validations
    validateBookDetails(title, author, pageCount);

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          pageCount,
          author,
        },
      },
      { new: true }
    );

    if (!updatedBook) {
      throw new CustomErrors(404, 'Book not found');
    }

    res.json({ updatedBook, message: 'Book Details Updated' });
  } catch (error) {
    next(error);
  }
};

// * Delete a Book
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;

    const deleteBook = await Book.findByIdAndDelete(_id);
    if (!deleteBook) {
      throw new CustomErrors(404, 'Book not found');
    }
    res.json({ message: 'Book Deleted' });
  } catch (error) {
    next(error);
  }
};

export { postNewBook, getAllBooks, putUpdateBook, deleteBook };

function validateBookDetails(title: string, author: string, pageCount: number) {
  // * Validations
  if (typeof title !== 'string' || title === '') {
    throw new CustomErrors(401, 'Invalid Title');
  }
  if (
    typeof author !== 'string' ||
    author === '' ||
    !/^[a-zA-Z]+$/.test(author)
  ) {
    throw new CustomErrors(401, 'Invalid Author');
  }
  if (typeof Number(pageCount) !== 'number' || Number(pageCount) <= 0) {
    throw new CustomErrors(401, 'Invalid Page Count');
  }
}
