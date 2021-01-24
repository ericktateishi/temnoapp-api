import { Router } from 'express';
import userRouter from '@infra/http/user/routes/user.routes';

const routes = Router();

routes.use('/user', userRouter);

export default routes;
