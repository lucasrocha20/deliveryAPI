import { UseCaseError } from '../useCaseError';

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(`Resource not found${message ? `: ${message}.` : '.'}`);
  }
}
