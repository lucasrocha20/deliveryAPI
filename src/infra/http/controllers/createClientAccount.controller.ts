// import {
//   BadRequestException,
//   Body,
//   ConflictException,
//   Controller,
//   HttpCode,
//   NotFoundException,
//   Post,
//   UsePipes,
// } from '@nestjs/common';
import { z, ZodSchema } from 'zod';
// import { ZodValidationPipe } from '@/infra/http/pipes/zodValidationPipe';
// import { UserAlreadyExistsError } from '@/domain/automaCast/application/useCases/errors/userAlreadyExistsError';
import { ResourceNotFoundError } from '@/shared/errors/errors/resourceNotFoundError';
import type { RegisterClientUseCase } from '@/domain/delivery/application/useCases/client/registerClient';
import { Router } from 'express';
import { ZodValidationMiddleware } from '../../middlewares/zodValidation.middleware';

const createClientAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
});

// type CreateClientAccountBodySchema = z.infer<typeof createClientAccountBodySchema>;


export class CreateAccountController {
  // public router = Router();

  constructor(
    private router: Router,
    // private registerClient: RegisterClientUseCase
  ) {


  // new ZodValidationMiddleware(createClientAccountBodySchema)
  this.router.post('/', 
    new ZodValidationMiddleware(createClientAccountBodySchema).transform,
    async (req, res) => {
      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: req.body, // já validado
      })
  })

    // const { name, email, password, phone, address } = req.body;

    // const result = await this.registerClient.execute({
    //   name,
    //   email,
    //   password,
    //   phone,
    //   address
    // });

    // if (result.isLeft()) {
    //   const error = result.value;

    //   switch (error.constructor) {
    //     case UserAlreadyExistsError:
    //       throw new ConflictException(error.message);
    //     case ResourceNotFoundError:
    //       throw new NotFoundException(error.message);
    //     default:
    //       throw new BadRequestException(error.message);
    //   }
    // }
  }

}
