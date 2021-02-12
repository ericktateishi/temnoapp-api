import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import LocationController from '@infra/http/location/controllers/LocationController';

const locationRouter = Router();
const locationController = new LocationController();

locationRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      addressComplement: Joi.string(),
      neighbourhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.string().required(),
      lng: Joi.number(),
      lat: Joi.number(),
    },
  }),
  locationController.create,
);

locationRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number(),
      offset: Joi.number(),
    },
  }),
  locationController.list,
);

locationRouter.get(
  '/search/',
  celebrate({
    [Segments.QUERY]: {
      word: Joi.string().required(),
      limit: Joi.number(),
      offset: Joi.number(),
    },
  }),
  locationController.search,
);

locationRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  locationController.show,
);

locationRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      address: Joi.string().required(),
      addressComplement: Joi.string(),
      neighbourhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.string().required(),
      lng: Joi.number(),
      lat: Joi.number(),
    },
  }),
  locationController.update,
);

locationRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  locationController.delete,
);

export default locationRouter;
