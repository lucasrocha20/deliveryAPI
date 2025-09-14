import type { Client } from "../../enterprise/entities/client";

export interface ClientsRepository {
  findByEmail(email: string): Promise<Client | null>;
  create(user: Client): Promise<void>;
  // save(user: User): Promise<void>;
}
