import { Entity } from '@/shared/entities/entity';
import { DomainEvent } from '../events/domainEvent';
import { DomainEvents } from '../events/domainEvents';

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  public addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  // public publishEvent(domainEvent: DomainEvent) {
  //   this.addDomainEvent(domainEvent);
  // }

  public clearEvents() {
    this._domainEvents = [];
  }
}
