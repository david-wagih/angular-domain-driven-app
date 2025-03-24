import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../domain/facades/auth.facade';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private facade: AuthFacade,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const state = await firstValueFrom(this.facade.state$);
    
    if (state.user) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
} 