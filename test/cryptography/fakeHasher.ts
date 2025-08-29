import type { HashComparer } from "@/domain/delivery/application/cryptography/hashComparer";
import type { HashGenerator } from "@/domain/delivery/application/cryptography/hashGenerator";

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
