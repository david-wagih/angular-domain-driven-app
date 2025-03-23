export class PhoneNumber {
  private constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Phone number is required');
    }

    // Basic phone number validation (can be enhanced based on requirements)
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(this.value)) {
      throw new Error('Invalid phone number format');
    }
  }

  static create(value: string): PhoneNumber {
    return new PhoneNumber(value.trim());
  }

  getValue(): string {
    return this.value;
  }

  format(): string {
    // Remove all non-digit characters
    const digits = this.value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    // If international format, just return as is
    return this.value;
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }
} 