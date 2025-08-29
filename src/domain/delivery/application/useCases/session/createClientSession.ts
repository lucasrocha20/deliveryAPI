import { Either, left, right } from '@/shared/either';
import { HashComparer } from '../../cryptography/hashComparer';
import { Encrypter } from '../../cryptography/encrypter';
import type { ClientsRepository } from '../../repositories/clientsRepository';
import { WrongCredentialsError } from '../errors/wrongCredentialsError';

interface CreateClientSessionUseCaseRequest {
  email: string;
  password: string;
}

type CreateClientSessionUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

export class CreateClientSessionUseCase {
  constructor(
    private clientsRepository: ClientsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: CreateClientSessionUseCaseRequest): Promise<CreateClientSessionUseCaseResponse> {
    const user = await this.clientsRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }


    const accessToken = await this.encrypter.encrypt({
      sub: user.uuid.toString(),
      email: user.email,
    });

    return right({
      accessToken,
    });
  }
}
