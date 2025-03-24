export abstract class DomainEvent {
  public readonly occurredOn: Date;
  public readonly eventName: string;

  constructor() {
    this.occurredOn = new Date();
    this.eventName = this.constructor.name;
  }
} 