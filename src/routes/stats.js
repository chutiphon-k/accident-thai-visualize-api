import { Router } from 'express';
import { keyBy } from 'lodash';

import { AccidentModel } from '../models';
import { enumerateBetweenYear } from '../utils';

const router = Router();

const START_YEAR = '2010';
const END_YEAR = '2019';

/**
 * @swagger
 * tags:
 *   name: Stat
 *   description: Stat Api
 */

/**
 * @swagger
 * /stats/year-accident-count:
 *   get:
 *     summary: Get accident count group by year
 *     tags: [Stat]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    year:
 *                      type: string
 *                    count:
 *                      type: integer
*/
router.get('/year-accident-count', async (req, res) => {
  const results = await AccidentModel.aggregate([
    { $match: { ACCIDENT_YEAR: { $gte: START_YEAR, $lte: END_YEAR } } },
    {
      $group: {
        _id: '$ACCIDENT_YEAR',
        year: { $first: '$ACCIDENT_YEAR' },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0 } },
    { $sort: { year: 1 } },
  ]);

  const years = enumerateBetweenYear(START_YEAR, END_YEAR);
  const resultsKeyByYear = keyBy(results, 'year');
  const finalizedResults = years.map((year) => ({
    year,
    count: resultsKeyByYear[year]?.count || 0,
  }));

  res.status(200).json(finalizedResults);
});

/**
 * @swagger
 * /stats/year-gender-accident-count:
 *   get:
 *     summary: Get accident count group by year, gender
 *     tags: [Stat]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    year:
 *                      type: string
 *                    maleCount:
 *                      type: integer
 *                    femaleCount:
 *                      type: integer
 *
*/
router.get('/year-gender-accident-count', async (req, res) => {
  const results = await AccidentModel.aggregate([
    { $match: { ACCIDENT_YEAR: { $gte: START_YEAR, $lte: END_YEAR } } },
    {
      $group: {
        _id: { year: '$ACCIDENT_YEAR' },
        year: { $first: '$ACCIDENT_YEAR' },
        maleCount: {
          $sum: {
            $cond: [{ $eq: ['$PERSON_GENDER', '1'] }, 1, 0],
          },
        },
        femaleCount: {
          $sum: {
            $cond: [{ $eq: ['$PERSON_GENDER', '2'] }, 1, 0],
          },
        },
      },
    },
    { $project: { _id: 0 } },
    { $sort: { year: 1 } },
  ]);
  console.log('------------------------------------');
  console.log(results);
  console.log('------------------------------------');
  const years = enumerateBetweenYear(START_YEAR, END_YEAR);
  const resultsKeyByYear = keyBy(results, 'year');
  const finalizedResults = years.map((year) => ({
    year,
    maleCount: resultsKeyByYear[year]?.maleCount || 0,
    femaleCount: resultsKeyByYear[year]?.femaleCount || 0,
  }));

  res.status(200).json(finalizedResults);
});

/**
 * @swagger
 * /stats/age-year-dead-accident-count:
 *   get:
 *     summary: Get sum of dead and count of accdient group by age, year
 *     tags: [Stat]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                    region:
 *                      type: string
 *                    years:
 *                      type: array
 *                      items:
 *                       type: string
 *                    income:
 *                      type: array
 *                      items:
 *                       type: integer
 *                    lifeExpectancy:
 *                      type: array
 *                      items:
 *                       type: integer
 *                    population:
 *                      type: array
 *                      items:
 *                       type: integer
 *
*/
router.get('/age-year-dead-accident', (req, res) => {
  // [
  //   {
  //     "name": "1",
  //     "region": "Gen Z",
  //     "years()": [
  //       2010,
  //       2011,
  //       2012,
  //       2013,
  //       2014,
  //       2015,
  //       2016,
  //       2017,
  //       2018,
  //       2019
  //     ],
  //     "income (HUMAN_DEAD)": [
  //       4,
  //       9,
  //       14,
  //       51,
  //       47,
  //       45,
  //       10,
  //       2,
  //       1,
  //       2
  //     ],
  //     "lifeExpectancy (ACCIDENT_COST)": [
  //       9014000,
  //       1335100,
  //       41155314,
  //       109852500,
  //       55336500,
  //       127958000,
  //       13746000,
  //       77500,
  //       1,
  //       100000
  //     ],
  //     "population (copy lifeExpectancy)": [
  //       9014000,
  //       1335100,
  //       41155314,
  //       109852500,
  //       55336500,
  //       127958000,
  //       13746000,
  //       77500,
  //       1,
  //       100000
  //     ]
  //   },]
  res.status(200).send('age-year-dead-accident-count');
});

/**
 * @swagger
 * /stats/road-type-road-skin-accident-count:
 *   get:
 *     summary: Get accident count group by road type, road skin
 *     tags: [Stat]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    source:
 *                      type: string
 *                    target:
 *                      type: string
 *                    count:
 *                      type: integer
 *
*/
router.get('/road-type-road-skin-accident-count', (req, res) => res.status(200).send('road-type-road-skin-accident-count'));

export default router;
