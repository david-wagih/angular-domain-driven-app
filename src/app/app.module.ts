import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { LocalStorageUserRepository } from './infrastructure/persistence/local-storage-user.repository';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: LocalStorageUserRepository
    }
  ]
})
export class AppModule { } 