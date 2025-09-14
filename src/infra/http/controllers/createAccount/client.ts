
import { z } from 'zod';
// import { ZodValidationPipe } from '@/infra/http/pipes/zodValidationPipe';
// import { Public } from '@/infra/auth/public';
import type { RegisterClientUseCase } from '@/domain/delivery/application/useCases/client/registerClient';

const registerClientBodySchema = z.object({
  name: z.string(),
});

type RegisterClientBodySchema = z.infer<typeof registerClientBodySchema>;

export class RegisterClientController {
  constructor(private registerClient: RegisterClientUseCase) {}

  async handle(body: RegisterClientBodySchema) {
    const { 
      name,
address,
email,
password,
phone
     } = body;

    const result = await this.registerClient.execute({
      name,
      address,
      email,
      password,
      phone
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        // case ClientAlreadyExistsError:
        //   throw new ConflictException(error.message);
        // default:
        //   throw new BadRequestException(error.message);
      }
    }
  }
}
