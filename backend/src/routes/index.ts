import { Router } from 'express';

import clinicsController from '../clinics/ctrl';

const router = Router();

router.get('/ping', (_, res) => res.send('pong'));

router.get('/clinics', clinicsController.getClinics);

export default router;
