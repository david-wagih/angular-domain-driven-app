export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}

export class TripNotFoundException extends DomainException {
  constructor(tripId: string) {
    super(`Trip with ID ${tripId} not found`);
    Object.setPrototypeOf(this, TripNotFoundException.prototype);
  }
}

export class TripFullyBookedException extends DomainException {
  constructor(tripId: string) {
    super(`Trip with ID ${tripId} is fully booked`);
    Object.setPrototypeOf(this, TripFullyBookedException.prototype);
  }
}

export class InvalidTripDatesException extends DomainException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidTripDatesException.prototype);
  }
} 