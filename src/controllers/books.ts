import { NextFunction, Request, RequestHandler, Response } from 'express';

// import { CustomErrors } from '../middlewares/errors';
import Book from '../models/books';

// * Create a new Review
const postNewBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, pageCount } = req.body;

  try {
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

    if (updatedBook) {
      res.json({ updatedBook, message: 'Book Details Updated' });
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

// * Delete a Book
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const { acknowledged } = await Book.deleteOne({ _id: id });

    if (acknowledged) {
      res.json({ message: 'Book Deleted' });
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export { postNewBook, getAllBooks, putUpdateBook, deleteBook };
