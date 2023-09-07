import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';

export function validationMiddleware<T>(type: any): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        return res.status(400).json(
          errors.map((error: any) => ({
            statusCode: 400,
            message: Object.values(error.constraints),
            error: 'Bad Request',
          })),
        );
      } else {
        next();
      }
    });
  };
}
