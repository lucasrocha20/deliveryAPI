import { FakeHasher } from 'test/cryptography/fakeHasher';
import { FakeEncrypter } from 'test/cryptography/fakeEncrypter';
import { makeClient } from 'test/factories/makeClient';
import { CreateClientSessionUseCase } from './createClientSession';
import { InMemoryClientsRepository } from 'test/repositories/inMemoryClientsRepository';

let inMemoryClientsRepository: InMemoryClientsRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: CreateClientSessionUseCase;

describe('Authenticate Client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new CreateClientSessionUseCase(
      inMemoryClientsRepository,
      fakeHasher,
      encrypter,
    );
  });

  it('should be able to authenticate a client', async () => {
    const client = makeClient({
      email: 'lucas@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryClientsRepository.items.push(client);

    const result = await sut.execute({
      email: 'lucas@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
