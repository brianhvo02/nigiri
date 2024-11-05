import { Router } from 'express';
import { GetLatestEntriesSeadex } from '../controllers/SeadexController';

const SeadexRouter = Router();

SeadexRouter.get('/latest', GetLatestEntriesSeadex);

export default SeadexRouter;