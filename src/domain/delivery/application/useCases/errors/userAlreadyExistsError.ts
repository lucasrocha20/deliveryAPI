import { UseCaseError } from '@/shared/errors/useCaseError';

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" already exists.`);
  }
}
