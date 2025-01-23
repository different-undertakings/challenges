import { query, body, param } from "express-validator";

export const validateQuery = [
  query("id").optional().isInt().withMessage("id must be an integer"),
];

export const validateGetResourceById = [
  param("id").isInt().withMessage("id must be an integer"),
];

export const validateCreateResource = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
  body("completed").isBoolean().withMessage("completed must be a boolean"),
];

export const validateUpdateResource = [
  param("id").isInt().withMessage("id must be an integer"),
  body("title").optional().isString().withMessage("title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed must be a boolean"),
];
