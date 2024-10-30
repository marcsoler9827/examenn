import { Router } from 'express';
import { home, about, createChampion, listChampions, championDetails, championForm } from '../controllers/routesController.js';

const router = Router();


router.get('/', home);


router.get('/about', about);


router.post('/createChampion', createChampion);
router.get('/champions', listChampions);
router.get('/champions/:name', championDetails);
router.get('/formulari', championForm);

export default router;
