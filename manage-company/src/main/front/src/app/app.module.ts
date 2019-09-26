import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { TaskComponent } from './admin/manage/task/task.component';
import { AccountComponent } from './admin/manage/account/account.component';
import { OrderComponent } from './admin/manage/order/order.component';

const routes: Routes = [
  { path: '', redirectTo: 'manage', pathMatch: 'full' }
];
const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
