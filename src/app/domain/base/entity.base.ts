import { DomainEvent } from './event.base';

export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class Entity implements IEntity {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;
  private domainEvents: DomainEvent[] = [];

  constructor(partial: Partial<Entity>) {
    Object.assign(this, partial);
  }

  equals(entity: Entity): boolean {
    if (!(entity instanceof Entity)) return false;
    return this.id === entity.id;
  }

  addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  clearDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }
}

export interface IAggregateRoot extends IEntity {
  version: number;
}

export abstract class AggregateRoot extends Entity implements IAggregateRoot {
  version: number = 1;

  constructor(partial: Partial<AggregateRoot>) {
    super(partial);
  }
} 