import type { Client } from "@/domain/delivery/enterprise/entities/client";
import type { ClientsRepository } from "@/domain/delivery/application/repositories/clientsRepository";

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = [];

  async findByEmail(email: string) {
    const client = this.items.find((item) => item.email === email);

    if (!client) {
      return null;
    }

    return client;
  }

  // async findByUUID(uuid: string) {
  //   const client = this.items.find((item) => item.uuid.toString() === uuid);

  //   if (!client) {
  //     return null;
  //   }

  //   return client;
  // }

  async create(client: Client) {
    this.items.push(client);
  }

  // async save(client: client) {
  //   const clientIndex = this.items.findIndex((item) => item.email === client.email);

  //   this.items[clientIndex] = client;
  // }

  // async findRoles(clientId: number) {
  //   const client = this.items.find((item) => item.id === clientId);

  //   if (!client) {
  //     return [];
  //   }

  //   return client.roles || [];
  // }
}
