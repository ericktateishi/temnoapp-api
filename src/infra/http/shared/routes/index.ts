import { Router } from 'express';
import userRouter from '@infra/http/user/routes/user.routes';
import vendorRouter from '@infra/http/vendor/routes/vendor.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/vendor', vendorRouter);

export default routes;
