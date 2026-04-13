import { Request, Response, NextFunction } from 'express';
import { ZodType, z } from 'zod';

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const { fieldErrors } =  z.flattenError(result.error)
      return res.status(400).json({
        error: 'Validation error',
        details: fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };
};
