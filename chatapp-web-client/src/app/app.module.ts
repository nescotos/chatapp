import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { RequestService } from './request.service';
import { UserService } from './user.service';
import { AuthComponent } from './auth/auth.component';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RequestService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
