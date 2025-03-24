import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./button.component.css'],
  template: `
    <button
      [class]="buttonClasses"
      [type]="type"
      [disabled]="disabled"
      (click)="buttonClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return [
      'button',
      `button-${this.variant}`,
      `button-${this.size}`,
      this.fullWidth ? 'button-full' : ''
    ].filter(Boolean).join(' ');
  }

  onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
  }
}
