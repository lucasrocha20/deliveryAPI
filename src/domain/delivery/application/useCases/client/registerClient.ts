import { Client } from '@/domain/delivery/enterprise/entities/client';
import { HashGenerator } from '../../cryptography/hashGenerator';
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError';
import { Either, left, right } from '@/shared/either';
import { ResourceNotFoundError } from '@/shared/errors/errors/resourceNotFoundError';
import type { ClientsRepository } from '../../repositories/clientsRepository';

interface RegisterClientUseCaseRequest {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}

type RegisterClientUseCaseResponse = Either<
  UserAlreadyExistsError | ResourceNotFoundError,
  {
    client: Client;
  }
>;

export class RegisterClientUseCase {
  constructor(
    private clientsRepository: ClientsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    address,
    phone,
    password,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const clientWithSameEmail = await this.clientsRepository.findByEmail(email);

    if (clientWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const client = Client.create({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
    });

    await this.clientsRepository.create(client);

    return right({
      client,
    });
  }
}
