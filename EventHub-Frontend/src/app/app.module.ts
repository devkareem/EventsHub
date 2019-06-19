import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{Routes, RouterModule} from '@angular/router'
import {MatInputModule} from '@angular/material/input';
import { EventsComponent } from './events/events.component';
import { EventService } from './services/event.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';
import { UsersComponent } from './users/users.component';
import {MatRadioModule} from '@angular/material/radio';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { FirstLetterUppercasePipe } from './users/first-letter-uppercase.pipe';
import { UserEventComponent } from './user-event/user-event.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { UsersServiceService } from './services/users-service.service';
import { PhoneFormatPipe } from './users/phone-format.pipe';

const MY_ROUTE:Routes=[{path:'',redirectTo:'Home',pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'Home',component:HomeComponent,canActivate:[AuthGuard]},
{path:'events',component:EventsComponent,canActivate:[AuthGuard]},
{path:'users',component:UsersComponent},
{path:'users/edit',component:UpdateUserComponent},
{path:'users/invitedevents',component:UserEventComponent},
{path:'**',redirectTo:'Home'}];


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    HomeComponent,

    MainNavComponent,

    UsersComponent,
    EventsComponent,
    UpdateUserComponent,
    FirstLetterUppercasePipe,
    UserEventComponent,
    PhoneFormatPipe

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(MY_ROUTE),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [AuthService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},AuthGuard, EventService,UsersServiceService],

  bootstrap: [AppComponent]
})
export class AppModule { }
