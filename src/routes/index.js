import { Router } from 'express';

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

export default router;
