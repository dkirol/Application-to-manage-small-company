import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: []},
  {path: 'admin/login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
})
export class AdminModule { }
