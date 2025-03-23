export class UserId {
  private constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('User ID is required');
    }
  }

  static create(value: string): UserId {
    return new UserId(value.trim());
  }

  static generate(): UserId {
    return new UserId(crypto.randomUUID());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
} 