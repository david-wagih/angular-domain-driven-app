import { Email } from "../value-objects/email.value-object";
import { Password } from "../value-objects/password.value-object";
import { UserId } from "../value-objects/user-id.value-object";

export class User {
  private readonly _id: UserId;
  private _username: string;
  private _email: Email;
  private _password: Password;
  private _firstName: string;
  private _lastName: string;
  private _isActive: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: UserId,
    username: string,
    email: Email,
    password: Password,
    firstName: string,
    lastName: string
  ) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
    this._firstName = firstName;
    this._lastName = lastName;
    this._isActive = true;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  // Getters
  get id(): UserId {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get email(): Email {
    return this._email;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  // Domain methods
  public deactivate(): void {
    this._isActive = false;
    this._updatedAt = new Date();
  }

  public activate(): void {
    this._isActive = true;
    this._updatedAt = new Date();
  }

  public updateProfile(firstName: string, lastName: string): void {
    this._firstName = firstName;
    this._lastName = lastName;
    this._updatedAt = new Date();
  }

  public changePassword(newPassword: Password): void {
    this._password = newPassword;
    this._updatedAt = new Date();
  }

  public validatePassword(password: string): boolean {
    return this._password.validate(password);
  }
} 