export class Location {
  private constructor(
    private readonly city: string,
    private readonly country: string,
    private readonly coordinates?: {
      latitude: number;
      longitude: number;
    }
  ) {
    if (!city || !country) {
      throw new Error('City and country are required');
    }
    if (coordinates) {
      if (coordinates.latitude < -90 || coordinates.latitude > 90) {
        throw new Error('Invalid latitude');
      }
      if (coordinates.longitude < -180 || coordinates.longitude > 180) {
        throw new Error('Invalid longitude');
      }
    }
  }

  static create(
    city: string,
    country: string,
    coordinates?: { latitude: number; longitude: number }
  ): Location {
    return new Location(city, country, coordinates);
  }

  getCity(): string {
    return this.city;
  }

  getCountry(): string {
    return this.country;
  }

  getCoordinates(): { latitude: number; longitude: number } | undefined {
    return this.coordinates ? { ...this.coordinates } : undefined;
  }

  format(): string {
    return `${this.city}, ${this.country}`;
  }

  equals(other: Location): boolean {
    return (
      this.city === other.city &&
      this.country === other.country &&
      this.coordinates?.latitude === other.coordinates?.latitude &&
      this.coordinates?.longitude === other.coordinates?.longitude
    );
  }
} 