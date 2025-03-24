export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    // This is necessary for extending Error in TypeScript
    Object.setPrototypeOf(this, DomainException.prototype);
  }
} 