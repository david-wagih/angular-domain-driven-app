import { DomainException } from '../domain-exception';
import { UserId } from '../../value-objects/user-id.value-object';

export class UserNotFoundException extends DomainException {
  constructor(userId: UserId | string) {
    super(`User with ID ${userId.toString()} not found`);
    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
} 