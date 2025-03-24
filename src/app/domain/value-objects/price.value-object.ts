export class Price {
  private constructor(
    private readonly amount: number,
    private readonly currency: string
  ) {
    if (amount < 0) {
      throw new Error('Price amount cannot be negative');
    }
    if (!currency) {
      throw new Error('Currency cannot be empty');
    }
    if (!this.isValidCurrency(currency)) {
      throw new Error('Invalid currency code');
    }
  }

  static create(amount: number, currency: string = 'USD'): Price {
    return new Price(amount, currency);
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  format(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency
    }).format(this.amount);
  }

  equals(other: Price): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  add(other: Price): Price {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add prices with different currencies');
    }
    return new Price(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Price {
    if (factor < 0) {
      throw new Error('Multiplication factor cannot be negative');
    }
    return new Price(this.amount * factor, this.currency);
  }

  private isValidCurrency(currency: string): boolean {
    try {
      new Intl.NumberFormat('en-US', { style: 'currency', currency });
      return true;
    } catch {
      return false;
    }
  }
}