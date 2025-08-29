import { UseCaseError } from '@/shared/errors/useCaseError';

export class NotAllowedError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(`Not allowed${message ? `: ${message}.` : '.'}`);
  }
}
