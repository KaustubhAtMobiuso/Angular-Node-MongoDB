import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ToasterModule, ToasterService} from 'angular2-toaster';

import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NewUserService } from './new-user-service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/newUser',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: UserLoginComponent
  },

  {
    path: 'newUser',
    component: NewUserComponent
  },

  {
    path: 'userDashboard',
    component: UserDashboardComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    UserLoginComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ToasterModule
  ],
  providers: [NewUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
