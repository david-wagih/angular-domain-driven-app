import { Injectable } from '@angular/core';
import { DomainEvent } from './event';

type EventHandler = (event: DomainEvent) => void;

@Injectable({
  providedIn: 'root'
})
export class EventDispatcher {
  private handlers: Map<string, EventHandler[]> = new Map();

  register(eventName: string, handler: EventHandler): void {
    const handlers = this.handlers.get(eventName) || [];
    handlers.push(handler);
    this.handlers.set(eventName, handlers);
  }

  dispatch(event: DomainEvent): void {
    const eventName = event.constructor.name;
    const handlers = this.handlers.get(eventName) || [];
    handlers.forEach(handler => handler(event));
  }
} 