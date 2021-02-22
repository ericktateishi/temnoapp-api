import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import {
  authGenerate,
  authValidate,
  allowAdmin,
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
      locationId: Joi.string(),
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
      id: Joi.string(),
      name: Joi.string(),
      email: Joi.string().email(),
      locationId: Joi.string(),
      phone: Joi.string(),
      password: Joi.string(),
      oldPassword: Joi.string(),
      adminPassword: Joi.string(),
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
  allowAdmin,
  userController.status,
);

userRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      email: Joi.string().email().required(),
    },
  }),
  allowAdmin,
  userController.show,
);

userRouter.get(
  '/search/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number(),
      offset: Joi.number(),
      email: Joi.string().allow(''),
    },
  }),
  allowAdmin,
  userController.search,
);

userRouter.get(
  '/:id/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  allowAdmin,
  userController.showById,
);

export default userRouter;
