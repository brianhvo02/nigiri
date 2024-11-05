import { Router } from 'express';
import FileRouter from './FileRouter';
import SeadexRouter from './SeadexRouter';
import AniListRouter from './AniListRouter';

const AppRouter = Router();

AppRouter.use('/files', FileRouter);
AppRouter.use('/seadex', SeadexRouter);
AppRouter.use('/anilist', AniListRouter);

export default AppRouter;