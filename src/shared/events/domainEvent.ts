import { UniqueEntityUUID } from '../entities/uniqueEntityUuid';

export interface DomainEvent {
  occurredAt: Date;
  getAggregateId(): UniqueEntityUUID;
}
