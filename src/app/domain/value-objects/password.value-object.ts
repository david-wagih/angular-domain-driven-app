export class Password {
  private readonly _value: string;
  private readonly _hashedValue: string;

  constructor(password: string) {
    if (!this.isValidPassword(password)) {
      throw new Error('Password must be at least 8 characters long and contain at least one number and one letter');
    }
    this._value = password;
    this._hashedValue = this.hashPassword(password);
  }

  get value(): string {
    return this._value;
  }

  get hashedValue(): string {
    return this._hashedValue;
  }

  private isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  private hashPassword(password: string): string {
    // In a real application, use a proper hashing algorithm like bcrypt
    return btoa(password);
  }

  validate(password: string): boolean {
    return this._hashedValue === this.hashPassword(password);
  }

  equals(other: Password): boolean {
    return this._hashedValue === other._hashedValue;
  }
} 