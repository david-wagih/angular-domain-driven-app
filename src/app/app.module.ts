import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { MockUserRepository } from './infrastructure/persistence/mock-user.repository';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    AppComponent
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository
    }
  ],
})
export class AppModule { } 