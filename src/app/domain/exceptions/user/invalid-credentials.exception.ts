import { DomainException } from '../domain-exception';

export class InvalidCredentialsException extends DomainException {
  constructor() {
    super('Invalid credentials provided');
    Object.setPrototypeOf(this, InvalidCredentialsException.prototype);
  }
} 