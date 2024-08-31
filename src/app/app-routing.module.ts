import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
