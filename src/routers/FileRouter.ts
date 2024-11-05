import { Router } from 'express';
import FileController from '../controllers/FileController';

const FileRouter = Router();

FileRouter.get('/:path(.+)', FileController);

export default FileRouter;