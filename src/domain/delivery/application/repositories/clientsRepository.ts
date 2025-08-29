import type { Client } from "../../enterprise/entities/client";

export abstract class ClientsRepository {
  abstract findByEmail(email: string): Promise<Client | null>;
  abstract create(user: Client): Promise<void>;
  // abstract save(user: User): Promise<void>;
}
