export class ParticipantLimit {
  // Bad: Public mutable properties in a value object
  public current: number;
  public maximum: number;

  constructor(maximum: number, current: number = 0) {
    // Missing validation
    this.maximum = maximum;
    this.current = current;
  }

  // Good: Immutable operation returning new instance
  increment(): ParticipantLimit {
    if (this.current >= this.maximum) {
      throw new Error('Maximum participants reached');
    }
    return new ParticipantLimit(this.maximum, this.current + 1);
  }

  // Bad: Mutable operation
  decrement(): void {
    if (this.current <= 0) {
      throw new Error('No participants to remove');
    }
    this.current--;
  }

  // Bad: Getter for mutable state
  get available(): number {
    return this.maximum - this.current;
  }

  // Bad: Direct comparison instead of value object equality
  equals(other: ParticipantLimit): boolean {
    return this.maximum === other.maximum && this.current === other.current;
  }

  // Missing proper value object methods like clone(), toString()
} 