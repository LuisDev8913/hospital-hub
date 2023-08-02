import type { NextFunction, Request, Response } from "express";

export const notFound = async (_: Request, res: Response, __: NextFunction) =>
  res.status(404).send({
    isSuccess: false,
    message: "Resource not found"
  });
