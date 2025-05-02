import type { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Default values
  const code = err.status || err.code || 500;
  const message =
    typeof err === 'string' ? err : err.message || 'Internal Server Error';

  res.status(code).json({
    message,
    code,
  });
}
