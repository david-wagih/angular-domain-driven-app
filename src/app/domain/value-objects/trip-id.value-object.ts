export class TripId {
  private constructor(private readonly value: string) {
    if (!value) {
      throw new Error('Trip ID cannot be empty');
    }
  }

  static generate(): TripId {
    return new TripId(crypto.randomUUID());
  }

  static fromString(value: string): TripId {
    return new TripId(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: TripId): boolean {
    return this.value === other.value;
  }
} 