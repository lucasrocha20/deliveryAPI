import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodType } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationMiddleware {
  constructor(private schema: ZodType) {}

  transform(req: Request, res: Response, next: NextFunction): any {
    try {
      this.schema.parse(req.body);
      next();
    } catch (error) {

      console.log("error", error)
      if (error instanceof ZodError) {
        throw res.status(400).json({ error: 'Validation failed', errors: fromZodError(error) });
      }
      
      throw res.status(400).json({ error: 'Validation failed' });
    }
    }
}