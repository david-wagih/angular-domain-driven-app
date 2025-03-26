export class DateRange {
  private constructor(
    private readonly _startDate: Date,
    private readonly _endDate: Date
  ) {}

  static create(startDate: Date, endDate: Date): DateRange {
    if (startDate >= endDate) {
      throw new Error('Start date must be before end date');
    }
    return new DateRange(startDate, endDate);
  }

  get startDate(): Date {
    return new Date(this._startDate);
  }

  get endDate(): Date {
    return new Date(this._endDate);
  }

  getDurationInDays(): number {
    return Math.ceil(
      (this._endDate.getTime() - this._startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  includes(date: Date): boolean {
    return date >= this._startDate && date <= this._endDate;
  }

  overlaps(dateRange: DateRange): boolean {
    return (
      this._startDate <= dateRange.endDate && 
      this._endDate >= dateRange.startDate
    );
  }

  equals(dateRange: DateRange): boolean {
    return (
      this._startDate.getTime() === dateRange.startDate.getTime() &&
      this._endDate.getTime() === dateRange.endDate.getTime()
    );
  }

  format(): string {
    return `${this._startDate.toLocaleDateString()} - ${this._endDate.toLocaleDateString()}`;
  }
} 