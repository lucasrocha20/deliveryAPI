import Jwt from 'jsonwebtoken';

import type { Encrypter } from "@/domain/delivery/application/cryptography/encrypter";

export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: typeof Jwt) {}

  encrypt(payload: Record<string, unknown>): string {
    // todo: Corrigir chave secreta
    return this.jwtService.sign(payload, 'sdsaf');
  }
}
