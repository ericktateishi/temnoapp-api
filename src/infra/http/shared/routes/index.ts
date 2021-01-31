import { Router } from 'express';
import userRouter from '@infra/http/user/routes/user.routes';
import vendorRouter from '@infra/http/vendor/routes/vendor.routes';
import authRouter from '@infra/http/auth/routes/auth.routes';
import locationRouter from '@infra/http/location/routes/location.routes';
import categoryRouter from '@infra/http/category/routes/category.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/vendor', vendorRouter);
routes.use('/auth', authRouter);
routes.use('/location', locationRouter);
routes.use('/category', categoryRouter);

export default routes;
