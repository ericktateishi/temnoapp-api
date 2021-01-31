import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import {
  authGenerate,
  authValidate,
} from '@infra/http/shared/middlewares/Auth';
import UserController from '@infra/http/user/controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      location: Joi.string().required(),
      phone: Joi.string(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
  authGenerate,
);

userRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      location: Joi.string(),
      phone: Joi.string(),
      password: Joi.string(),
      oldPassword: Joi.string(),
    },
  }),
  authValidate,
  userController.update,
  authGenerate,
);

userRouter.put(
  '/status/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  userController.status,
);

userRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      email: Joi.string().email().required(),
    },
  }),
  userController.show,
);

export default userRouter;
