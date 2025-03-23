export class UserId {
  private readonly _value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('User ID cannot be empty');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: UserId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
} 