import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
 
  eventId: string
  eventForm: FormGroup;
  
  constructor(public fb: FormBuilder, public eve: EventService, public rou: ActivatedRoute) {
    this.eventForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      owner: [''],
      invaitedUsers: [[]]
    });
    this.rou.paramMap.subscribe(
      params=>{this.eventId= params.get('id')}
    )
    if (this.eventId) {
      this.eve.getCurrentEvent(this.eventId).subscribe((res: any) => {
        console.log(res);
        if (res.status === 'OK') {
          console.log(res);
          this.eventForm.patchValue(res.data);
        }
      });
    }

  }



  onSubmit() {
    //this.userForm.value.password = this.userForm.value.passwordGroup.password;
    console.log(this.eventForm.value);
    this.eve.UpdateEvent(this.eventId, this.eventForm.value);
  }
  

  }
