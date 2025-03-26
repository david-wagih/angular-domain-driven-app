export interface DomainEvent {
  occurredOn: Date;
  eventName: string;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly occurredOn: Date;
  public abstract readonly eventName: string;

  constructor() {
    this.occurredOn = new Date();
  }
} 