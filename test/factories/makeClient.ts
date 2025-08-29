import { faker } from '@faker-js/faker';

import { UniqueEntityUUID } from '@/shared/entities/uniqueEntityUuid';
import { Client, type ClientProps } from '@/domain/delivery/enterprise/entities/client';

export function makeClient(
  override: Partial<ClientProps> = {},
  uuid?: UniqueEntityUUID,
) {
  const client = Client.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      ...override,
    },
    uuid,
  );

  return client;
}