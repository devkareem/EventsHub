import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{Routes, RouterModule} from '@angular/router'
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { UsersComponent } from './users/users.component';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';

const MY_ROUTE:Routes=[{path:'',redirectTo:'Home',pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'Home',component:HomeComponent},
{path:'users', component: UsersComponent },
{path:'**',redirectTo:'Home'}];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(MY_ROUTE),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    HttpClientModule
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
