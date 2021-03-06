import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import { allowAdmin, authValidate } from '@infra/http/shared/middlewares/Auth';
import VendorController from '@infra/http/vendor/controllers/VendorController';

const vendorRouter = Router();
const vendorController = new VendorController();

vendorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      userId: Joi.string().required(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      locationId: Joi.string().required(),
      description: Joi.string(),
      categoryId: Joi.string(),
      hours: Joi.object({
        sunday: Joi.string(),
        monday: Joi.string(),
        tuesday: Joi.string(),
        wednesday: Joi.string(),
        thursday: Joi.string(),
        friday: Joi.string(),
        saturday: Joi.string(),
      }),
      facebook: Joi.string(),
      instagram: Joi.string(),
      twitter: Joi.string(),
    },
  }),
  vendorController.create,
);

vendorRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number(),
      offset: Joi.number(),
    },
  }),
  vendorController.list,
);

vendorRouter.get(
  '/search/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number(),
      offset: Joi.number(),
      category: Joi.string().allow(''),
      location: Joi.string().allow(''),
      word: Joi.string().allow(''),
      inactivated: Joi.boolean().allow(''),
    },
  }),
  vendorController.search,
);

vendorRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  vendorController.show,
);

vendorRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      userId: Joi.string(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      locationId: Joi.string().required(),
      description: Joi.string(),
      categoryId: Joi.string(),
      hours: Joi.object({
        sunday: Joi.string(),
        monday: Joi.string(),
        tuesday: Joi.string(),
        wednesday: Joi.string(),
        thursday: Joi.string(),
        friday: Joi.string(),
        saturday: Joi.string(),
      }),
      facebook: Joi.string(),
      instagram: Joi.string(),
      twitter: Joi.string(),
    },
  }),
  authValidate,
  vendorController.update,
);

vendorRouter.put(
  '/status/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  allowAdmin,
  vendorController.status,
);

export default vendorRouter;
