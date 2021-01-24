import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
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
    },
  }),
  userController.create,
);

userRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      location: Joi.string().required(),
      phone: Joi.string(),
    },
  }),
  userController.update,
);

userRouter.put(
  '/inactivate',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  userController.inactivate,
);

userRouter.put(
  '/activate',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  userController.activate,
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
