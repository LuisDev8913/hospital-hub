import type { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = async (err, _: Request, res: Response, __: NextFunction) => {
  console.error(`Error: ${err}`.red);
  return res.status(500).send({
    isSuccess: false,
    message: 'Server Error'
  });
};
