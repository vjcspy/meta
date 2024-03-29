export const errorHandler = (error: any, _req: any, res: any, next: any) => {
  if (res.headersSent) {
    return next(error);
  }
  // eslint-disable-next-line no-param-reassign
  if (!error.statusCode) error.statusCode = 500;

  // if (error.statusCode === 301) {
  //   return res.status(301).redirect('/not-found');
  // }

  return res
    .status(error.statusCode)
    .json({ error: true, message: error?.toString() ?? 'Unknown Error' });
};
