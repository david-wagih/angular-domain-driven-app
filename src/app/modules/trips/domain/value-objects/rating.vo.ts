// Bad: Direct dependency on external library without abstraction
import { formatDistance } from 'date-fns';

export class Rating {
  // Bad: Mutable properties in value object
  private _value: number;
  private _comment: string;
  public timestamp: Date; // Bad: Public mutable property

  constructor(value: number, comment: string = '') {
    // Bad: Business validation mixed with technical validation
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Rating must be a valid number');
    }
    if (value < 1 || value > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    
    this._value = value;
    this._comment = comment;
    this.timestamp = new Date();
  }

  // Bad: Mixing domain logic with presentation
  get formattedTimestamp(): string {
    return formatDistance(this.timestamp, new Date(), { addSuffix: true });
  }

  // Bad: Setter in value object
  set comment(newComment: string) {
    this._comment = newComment.trim();
  }

  // Good: Immutable getter
  get value(): number {
    return this._value;
  }

  get comment(): string {
    return this._comment;
  }

  // Bad: Static method with UI concern
  static getStarSymbol(value: number): string {
    return '★'.repeat(value) + '☆'.repeat(5 - value);
  }

  // Bad: Missing proper value object methods (equals, clone)
} 