import { enter } from '@modules/map-maker/controllers/enter';
import express from 'express';

const router = express.Router({ mergeParams: true });

router.get('/enter', enter);
router.get('/', (req, res) => {
  res.send('Hello World!');
});

export const mapMakerRouter = router;
