import { Router } from 'express';
import userRouter from '@infra/http/user/routes/user.routes';
import vendorRouter from '@infra/http/vendor/routes/vendor.routes';
import authRouter from '@infra/http/auth/routes/auth.routes';
import locationRouter from '@infra/http/location/routes/location.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/vendor', vendorRouter);
routes.use('/auth', authRouter);
routes.use('/location', locationRouter);

export default routes;
