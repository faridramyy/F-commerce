import { validationResult } from "express-validator";

export const validationResultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "fail",
      errors: errors.array().map((err) => ({ field: err.param, msg: err.msg })),
    });
  }
  next();
};
