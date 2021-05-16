import { Router } from 'express';
import {
  keyBy, flatten, chain, map,
} from 'lodash';

import { AccidentModel } from '../models';
import { enumerateBetweenNumber } from '../utils';

const router = Router();

const START_YEAR = 2010;
const END_YEAR = 2019;

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
 *                      type: integer
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

  const years = enumerateBetweenNumber(START_YEAR, END_YEAR);
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
 *                      type: integer
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

  const years = enumerateBetweenNumber(START_YEAR, END_YEAR);
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
 * /stats/age-year-dead-accident-summary:
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
 *                      type: integer
 *                    region:
 *                      type: string
 *                    years:
 *                      type: array
 *                      items:
 *                       type: integer
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
router.get('/age-year-dead-accident-summary', async (req, res) => {
  const START_AGE = 1;
  const END_AGE = 100;

  const results = await AccidentModel.aggregate([
    {
      $match: {
        ACCIDENT_YEAR: { $gte: START_YEAR, $lte: END_YEAR },
        PERSON_AGE: { $gte: START_AGE, $lte: END_AGE },
      },
    },
    {
      $group: {
        _id: { name: '$PERSON_AGE', year: '$ACCIDENT_YEAR' },
        name: { $first: '$PERSON_AGE' },
        year: { $first: '$ACCIDENT_YEAR' },
        income: { $sum: '$HUMAN_DEAD' },
        lifeExpectancy: { $sum: '$ACCIDENT_COST' },
      },
    },
    { $project: { _id: 0 } },
    { $sort: { name: 1, year: 1 } },
  ]);

  const resultsKeyNameYear = keyBy(results, ({ name, year }) => `${name}_${year}`);
  const years = enumerateBetweenNumber(START_YEAR, END_YEAR);
  const names = enumerateBetweenNumber(1, 100);

  const finalizedResults = chain(names
    .map((name) => years.map((year) => ({
      name,
      year,
      income: resultsKeyNameYear[`${name}_${year}`]?.income || 1,
      lifeExpectancy: resultsKeyNameYear[`${name}_${year}`]?.lifeExpectancy || 1,
    }))))
    .flatten()
    .groupBy('name')
    .map((values, name) => ({
      name,
      region: (() => {
        switch (true) {
          case name <= 24:
            return 'Gen Z';
          case name <= 40:
            return 'Millennials';
          case name <= 56:
            return 'Gen X';
          case name <= 66:
            return 'Boomers II';
          case name <= 75:
            return 'Boomers I';
          case name <= 93:
            return 'Post War';
          case name <= 100:
            return 'WW II';
          default:
            return '';
        }
      })(),
      years: map(values, 'year'),
      income: map(values, 'income'),
      lifeExpectancy: map(values, 'lifeExpectancy'),
      population: map(values, 'lifeExpectancy'),
    }))
    .value();

  res.status(200).json(finalizedResults);
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
