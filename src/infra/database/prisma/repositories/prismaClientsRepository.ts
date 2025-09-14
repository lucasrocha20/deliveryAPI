import { ClientsRepository } from "../../../../domain/delivery/application/repositories/clientsRepository";
import { PrismaService } from "../prisma.service";
import { UniqueEntityUUID } from "../../../../shared/entities/uniqueEntityUuid";
import { Client } from "../../../../domain/delivery/enterprise/entities/client";
import { PrismaUserMapper } from "../mappers/prismaUsersMapper";

// Mapper class could be created for this
export class PrismaClientsRepository implements ClientsRepository {
  constructor(private prisma: PrismaService) {}

async findByEmail(email: string): Promise<Client | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return Client.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
      },
      new UniqueEntityUUID(user.uuid),
    );
  }

  async create(client: Client): Promise<void> {
    const data = PrismaUserMapper.toPrisma(client);
    console.log('data', data)

    await this.prisma.user.create({
      data,
    });
  }
}
