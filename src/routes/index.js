import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import csvtojson from 'csvtojson';
import Boom from 'boom';

import { AccidentModel } from '../models';
import stats from './stats';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check service
 *     responses:
 *       200:
 *         description: Return "🩺 service is available"
 *         content:
 *           text/plain:
 *              schema:
 *                type: string
*/
router.get('/health', (req, res) => res.status(200).send('🩺 service is available'));

/**
 * @swagger
 * /datasets:
 *  post:
 *    summary: Bulk create dataset
 *    responses:
 *      201:
 *        description: Return "ok"
 *
*/
router.post('/datasets', async (req, res) => {
  const filename = 'dataset.csv';
  const filePath = path.join(__dirname, `../../temp/${filename}`);

  if (!fs.existsSync(filePath)) throw Boom.notFound('dateset file not found, please check path or filename');

  const json = await csvtojson().fromFile(filePath);
  const finalizedData = json.map(({ ACCIDENT_YEAR, ...rest }) => ({
    ...rest,
    ACCIDENT_YEAR: ACCIDENT_YEAR.length === 1 ? `200${ACCIDENT_YEAR}` : `20${ACCIDENT_YEAR}`,
  }));

  await AccidentModel.deleteMany();
  await AccidentModel.insertMany(finalizedData);

  res.status(201).send('ok');
});

router.use('/stats', stats);

export default router;
