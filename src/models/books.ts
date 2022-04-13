import { Schema, model } from 'mongoose';

interface Book {
  title: string;
  author: string;
  pageCount: number;
}

const bookSchema = new Schema<Book>(
  {
    title: { type: 'string', required: true },
    author: { type: 'string', required: true },
    pageCount: { type: 'number', required: true },
  },
  {
    timestamps: true,
  }
);

export default model<Book>('Books', bookSchema);
