import { Router } from 'express';
import { z } from 'zod';
import { ZodValidationMiddleware } from '../../middlewares/zodValidation.middleware';
import { CreateClientSessionUseCase } from '@/domain/delivery/application/useCases/session/createClientSession';
import { WrongCredentialsError } from '@/domain/delivery/application/useCases/errors/wrongCredentialsError';

const createClientSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class CreateClientSessionController {
  constructor(
    private router: Router,
    private createClientSession: CreateClientSessionUseCase,
  ) {
    this.router.post(
      '/sessions',
      new ZodValidationMiddleware(createClientSessionBodySchema).transform,
      this.handle.bind(this),
    );
  }

  async handle(req: any, res: any) {
    const { email, password } = req.body;

    const result = await this.createClientSession.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          return res.status(401).json({
            statusCode: 401,
            message: error.message,
          });
        default:
            return res.status(400).json({
                statusCode: 400,
                message: 'Bad request',
              });
      }
    }

    if (result.isRight()) {
      const { accessToken } = result.value;
      return res.status(201).json({
        access_token: accessToken,
      });
    }
  }
}
