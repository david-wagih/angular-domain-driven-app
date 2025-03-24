export class DateRange {
  private constructor(
    private readonly startDate: Date,
    private readonly endDate: Date
  ) {
    if (!startDate || !endDate) {
      throw new Error('Start and end dates are required');
    }
    if (startDate > endDate) {
      throw new Error('Start date must be before end date');
    }
  }

  static create(startDate: Date, endDate: Date): DateRange {
    return new DateRange(startDate, endDate);
  }

  getStartDate(): Date {
    return new Date(this.startDate);
  }

  getEndDate(): Date {
    return new Date(this.endDate);
  }

  getDurationInDays(): number {
    const diffTime = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  format(): string {
    return `${this.startDate.toLocaleDateString()} - ${this.endDate.toLocaleDateString()}`;
  }

  isDateInRange(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  equals(other: DateRange): boolean {
    return (
      this.startDate.getTime() === other.startDate.getTime() &&
      this.endDate.getTime() === other.endDate.getTime()
    );
  }
} 