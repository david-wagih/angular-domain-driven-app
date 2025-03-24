import { DomainEvent } from '../domain-event';
import { UserId } from '../../value-objects/user-id.value-object';
import { User } from '../../entities/user.entity';

export class UserProfileUpdatedEvent extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly oldUser: User,
    public readonly newUser: User
  ) {
    super();
  }
} 