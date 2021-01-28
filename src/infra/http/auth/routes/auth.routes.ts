import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import AuthController from '@infra/http/auth/controllers/AuthController';
import { authGenerate } from '@infra/http/shared/middlewares/Auth';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/login/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.login,
  authGenerate,
);

export default authRouter;
