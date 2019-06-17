import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule, Validators} from "@angular/forms"
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { MyCustomHttpService } from './services/CustomService';
import { EventService } from './services/event.service';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MyCustomHttpService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
