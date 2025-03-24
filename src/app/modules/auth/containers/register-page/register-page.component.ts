import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '../../../../domain/facades/auth.facade';
import { RegisterUserDto } from '../../../../application/dtos/user.dto';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  template: `
    <app-register
      
    ></app-register>
  `
})
export class RegisterPageComponent {
  protected facade = inject(AuthFacade);

  async onRegister(credentials: RegisterUserDto): Promise<void> {
    try {
      await this.facade.register(credentials);
    } catch (error) {
      // Error is handled by the facade
      console.error('Register failed:', error);
    }
  }
} 