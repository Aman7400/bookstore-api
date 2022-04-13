import { NextFunction, Request, Response } from 'express';

// * Custom Error Class
export class CustomErrors extends Error {
  message: string;
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

// * Error Middleware
export function errorMiddleware(
  err: CustomErrors,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({
    message,
  });
}
