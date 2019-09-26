import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';
import { AdminComponent } from './admin.component';
import { LeaveComponent } from './manage/leave/leave.component';
import { ProductComponent } from './manage/product/product.component';
import { HeaderComponent } from './header/header.component';
import { CourseComponent } from './manage/course/course.component';
import { SaleComponent } from './manage/sale/sale.component';
import { TaskComponent } from './manage/task/task.component';
import { CustomerComponent } from './manage/customer/customer.component';
import { EmployeeComponent } from './manage/employee/employee.component';
import { AccountComponent } from './manage/account/account.component';

const routes: Routes = [
  // {path: 'admin', canActivate: [AuthGuard], children: [
  //   {path: '', component: AdminComponent, children: [
  //   {path: 'leaves', component: LeavesComponent}
  //   ]}
  // ]},

  { path: 'admin', component: AdminComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/leaves', component: LeaveComponent },
  { path: 'admin/products', component: ProductComponent },
  { path: 'admin/courses', component: CourseComponent},
  { path: 'admin/sales', component: SaleComponent},
  { path: 'admin/tasks', component: TaskComponent},
  { path: 'admin/accounts', component: AccountComponent},
  { path: 'admin/customers', component: CustomerComponent},
  { path: 'admin/employees', component: EmployeeComponent}
];

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    LeaveComponent,
    ProductComponent,
    CourseComponent,
    SaleComponent,
    TaskComponent,
    HeaderComponent,
    CustomerComponent,
    EmployeeComponent,
    AccountComponent
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
