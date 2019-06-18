import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, NgForm } from '@angular/forms';
import { UsersServiceService } from '../Services/users-service.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent  {
  
  myForm: FormGroup;
  users; 
  
  constructor(fb: FormBuilder, public eventService: EventService,private service: UsersServiceService) {
    this.users=eventService.getAllUsers();
    this.myForm = fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
      owner:[''],
      invaitedUsers:[[]]
    });
     } 
     onSubmit() {
      this.eventService.createEvent(this.myForm.value);
    }

   
}
