import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DisplayBalanceComponent } from './display-balance/display-balance.component';
import { LstTransactsComponent } from './lst-transacts/lst-transacts.component';
import { FormsModule } from '@angular/forms'; 
import { ErrorInterceptorService } from './services/error.interceptor/error.interceptor.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { NewTransactComponent } from './new-transact/new-transact.component';

@NgModule({
  declarations: [AppComponent, UserComponent, LoginComponent, DisplayBalanceComponent, LstTransactsComponent, CreateUserComponent, NewTransactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ 
    {   
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
