import { Request, Response } from 'express';

export const asyncHandler = fn => (req: Request, res: Response, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
