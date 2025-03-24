export abstract class DomainEvent {
  public readonly occurredOn: Date;

  constructor() {
    this.occurredOn = new Date();
  }
} 