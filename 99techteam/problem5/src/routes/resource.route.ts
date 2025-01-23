import express from "express";
import resourceConroller from "../controllers/resource.conroller";
import asyncWrap from "../wrappers/async-wrap.wrapper";

import {
  validateCreateResource,
  validateUpdateResource,
  validateGetResourceById,
  validateQuery,
} from "../validators/resource.validator";
import { validate } from "../middlewares/validate.middleware";

const router = express.Router();

router.get("/", validateQuery, validate, asyncWrap(resourceConroller.get));
router.get(
  "/:id",
  validateGetResourceById,
  validate,
  asyncWrap(resourceConroller.getById),
);
router.post(
  "/",
  validateCreateResource,
  validate,
  asyncWrap(resourceConroller.create),
);
router.put(
  "/:id",
  validateUpdateResource,
  validate,
  asyncWrap(resourceConroller.updateById),
);
router.delete(
  "/:id",
  validateGetResourceById,
  validate,
  asyncWrap(resourceConroller.deleteById),
);

export default router;
