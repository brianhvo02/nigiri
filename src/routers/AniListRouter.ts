import { Router } from 'express';
import { GetAnimeAniList } from '../controllers/AniListController';

const AniListRouter = Router();

AniListRouter.get('/anime/:id', GetAnimeAniList);

export default AniListRouter;