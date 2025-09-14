import { z } from 'zod';
import { ResourceNotFoundError } from '@/shared/errors/errors/resourceNotFoundError';
import { RegisterClientUseCase } from '@/domain/delivery/application/useCases/client/registerClient';
import { Request, Response } from 'express';
// import { UserAlreadyExistsError } from '@/shared/errors/errors/userAlreadyExistsError';

const createClientAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
  address: z.string(),
});

export class CreateAccountController {
  constructor(private registerClient: RegisterClientUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    // // O body já foi validado pelo middleware no arquivo de rotas
    const { name, email, password, phone, address } = req.body;

    const result = await this.registerClient.execute({
      name,
      email,
      password,
      phone,
      address,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        // case UserAlreadyExistsError:
        //   return res.status(409).json({ message: error.message }); // 409 Conflict
        // case ResourceNotFoundError:
        //   return res.status(404).json({ message: error.message }); // 404 Not Found
        // default:
        //   return res.status(400).json({ message: error.message }); // 400 Bad Request
      }
    }

    console.log('result', result)

    return res.status(201).json({ message: 'Client created successfully.' });
  }
}
