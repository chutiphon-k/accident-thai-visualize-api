import { Router } from 'express';

const router = Router();

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
 *                      type: string
*/
router.get('/year-accident-count', (req, res) => res.status(200).send('year-accident-count'));

/**
 * @swagger
 * /stats/year-gener-accident-count:
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
 *                      type: string
 *                    femaleCount:
 *                      type: string
 *
*/
router.get('/year-gender-accident-count', (req, res) => res.status(200).send('year-gener-accident-count'));

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
 *                       type: string
 *                    lifeExpectancy:
 *                      type: array
 *                      items:
 *                       type: string
 *                    population:
 *                      type: array
 *                      items:
 *                       type: string
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
 *                      type: string
 *
*/
router.get('/road-type-road-skin-accident-count', (req, res) => res.status(200).send('road-type-road-skin-accident-count'));

export default router;
