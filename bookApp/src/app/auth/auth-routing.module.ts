import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';

const authRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)
  ],
  exports:[
    RouterModule
  ]



})
export class AuthRoutingModule { }
