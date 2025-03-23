import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { LocalStorageUserRepository } from './infrastructure/persistence/local-storage-user.repository';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: LocalStorageUserRepository
    }
  ]
})
export class AppModule { } 