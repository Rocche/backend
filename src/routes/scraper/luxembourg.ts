import { Router } from 'express';

import * as scraper from './../../scraper/luxembourg';
const router = Router();

router.get('/status', (req, res) => (scraper.isServiceAvailable() ? res.sendStatus(200) : res.sendStatus(502)));

router.get('/data', (req, res) => (scraper.scrapeData() ? res.sendStatus(200) : res.sendStatus(502)));

export default router;
