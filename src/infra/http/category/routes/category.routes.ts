import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import { allowAdmin } from '@infra/http/shared/middlewares/Auth';
import CategoryController from '@infra/http/category/controllers/CategoryController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parentCategoryId: Joi.string(),
      image: Joi.string(),
    },
  }),
  allowAdmin,
  categoryController.create,
);

categoryRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      parent: Joi.string(),
      all: Joi.boolean(),
    },
  }),
  categoryController.list,
);

categoryRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  categoryController.show,
);

categoryRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      parentCategoryId: Joi.string(),
      image: Joi.string(),
    },
  }),
  allowAdmin,
  categoryController.update,
);

categoryRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  allowAdmin,
  categoryController.delete,
);

export default categoryRouter;
