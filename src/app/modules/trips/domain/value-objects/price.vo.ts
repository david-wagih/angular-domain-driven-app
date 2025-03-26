export class Price {
  private constructor(
    private readonly amount: number,
    private readonly currency: string
  ) {}

  static create(amount: number, currency: string): Price {
    if (amount < 0) {
      throw new Error('Price amount cannot be negative');
    }
    if (!currency || currency.length !== 3) {
      throw new Error('Currency must be a valid 3-letter code');
    }
    return new Price(amount, currency);
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  add(price: Price): Price {
    if (this.currency !== price.currency) {
      throw new Error('Cannot add prices with different currencies');
    }
    return Price.create(this.amount + price.amount, this.currency);
  }

  subtract(price: Price): Price {
    if (this.currency !== price.currency) {
      throw new Error('Cannot subtract prices with different currencies');
    }
    return Price.create(this.amount - price.amount, this.currency);
  }

  multiply(factor: number): Price {
    return Price.create(this.amount * factor, this.currency);
  }

  equals(price: Price): boolean {
    return this.amount === price.amount && this.currency === price.currency;
  }

  format(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency
    }).format(this.amount);
  }
} 