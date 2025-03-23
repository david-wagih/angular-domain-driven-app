export class Address {
  private constructor(
    private readonly street: string,
    private readonly city: string,
    private readonly state: string,
    private readonly country: string,
    private readonly postalCode: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.street || this.street.trim().length === 0) {
      throw new Error('Street is required');
    }
    if (!this.city || this.city.trim().length === 0) {
      throw new Error('City is required');
    }
    if (!this.state || this.state.trim().length === 0) {
      throw new Error('State is required');
    }
    if (!this.country || this.country.trim().length === 0) {
      throw new Error('Country is required');
    }
    if (!this.postalCode || this.postalCode.trim().length === 0) {
      throw new Error('Postal code is required');
    }
  }

  static create(
    street: string,
    city: string,
    state: string,
    country: string,
    postalCode: string
  ): Address {
    return new Address(
      street.trim(),
      city.trim(),
      state.trim(),
      country.trim(),
      postalCode.trim()
    );
  }

  getStreet(): string {
    return this.street;
  }

  getCity(): string {
    return this.city;
  }

  getState(): string {
    return this.state;
  }

  getCountry(): string {
    return this.country;
  }

  getPostalCode(): string {
    return this.postalCode;
  }

  toString(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.postalCode}, ${this.country}`;
  }

  equals(other: Address): boolean {
    return (
      this.street === other.street &&
      this.city === other.city &&
      this.state === other.state &&
      this.country === other.country &&
      this.postalCode === other.postalCode
    );
  }
} 