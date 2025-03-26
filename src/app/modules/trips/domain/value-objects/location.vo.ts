export interface Coordinates {
  lat: number;
  lng: number;
}

export class Location {
  private constructor(
    private readonly city: string,
    private readonly country: string,
    private readonly coordinates?: Coordinates
  ) {}

  static create(city: string, country: string, coordinates?: Coordinates): Location {
    if (!city || !country) {
      throw new Error('City and country are required');
    }
    return new Location(city, country, coordinates);
  }

  getCity(): string {
    return this.city;
  }

  getCountry(): string {
    return this.country;
  }

  getCoordinates(): Coordinates | undefined {
    return this.coordinates;
  }

  format(): string {
    return `${this.city}, ${this.country}`;
  }

  equals(location: Location): boolean {
    return (
      this.city === location.city &&
      this.country === location.country &&
      JSON.stringify(this.coordinates) === JSON.stringify(location.coordinates)
    );
  }
} 