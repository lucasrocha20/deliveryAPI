import { InMemoryClientsRepository } from 'test/repositories/inMemoryClientsRepository';
import { FakeHasher } from 'test/cryptography/fakeHasher';
import { RegisterClientUseCase } from './registerClient';

let inMemoryClientsRepository: InMemoryClientsRepository;
let fakeHasher: FakeHasher;

let sut: RegisterClientUseCase;

describe('Register Client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository();
    fakeHasher = new FakeHasher();

    sut = new RegisterClientUseCase(
      inMemoryClientsRepository,
      fakeHasher,
    );
  });

  it('should be able to register a new client', async () => {
    const result = await sut.execute({
      name: 'Lucas Rocha',
      email: 'lucas@client.com',
      password: '123456',
      address: '',
      phone: '',
    });

    console.log(inMemoryClientsRepository.items[0])

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      client: inMemoryClientsRepository.items[0],
    });
  });

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'Lucas Rocha',
      email: 'lucas@client.com',
      password: '123456',
      address: '',
      phone: '',
    });

    const hashedPassword = await fakeHasher.hash('123456');

    expect(result.isRight()).toBe(true);
    expect(inMemoryClientsRepository.items[0].password).toEqual(hashedPassword);
  });
});
