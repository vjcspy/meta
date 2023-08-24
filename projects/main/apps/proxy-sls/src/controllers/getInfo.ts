import type { Request, Response } from 'express';

export const getInfoController = (_req: Request, res: Response) => {
  console.log('getInfoController');
  res.json({
    repo: 'meta',
    branch: 'master',
    created_at: '22:04 20230824',
  });
};
