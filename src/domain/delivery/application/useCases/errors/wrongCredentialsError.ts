import { UseCaseError } from '@/shared/errors/useCaseError';

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super(`Credentials are not valid.`);
  }
}
