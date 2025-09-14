import { Prisma, User as PrismaUser } from '@prisma/client';
import { UniqueEntityUUID } from '@/shared/entities/uniqueEntityUuid';
import { Client } from '@/domain/delivery/enterprise/entities/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): Client {
    return Client.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        address: raw.password,
        phone: raw.password,
        createdAt: raw.createdAt,
        isActive: raw.isActive,
        updatedAt: raw.updatedAt
      },
      new UniqueEntityUUID(raw.uuid),
    );
  }

  static toPrisma(user: Client): Prisma.UserUncheckedCreateInput {
    return {
      uuid: user.uuid.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
      createdAt: user.createdAt,
      isActive: user.isActive,
      updatedAt: user.updatedAt
    };
  }
}
