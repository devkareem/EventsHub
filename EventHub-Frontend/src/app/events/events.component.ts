import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, NgForm } from '@angular/forms';
import { MyCustomHttpService } from '../services/CustomService';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../services/event.service';
import { EventClass } from '../model/model.events';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
  myForm: FormGroup;
  users:any[]; 
  


  constructor(fb: FormBuilder, service1:MyCustomHttpService, private service2: EventService) {
    service1.getData().subscribe(
      (res:any[])=>{
        this.users = res;
      }
    );
    this.myForm = fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
      invitedUsers: new FormArray([]),

      users:[]
    });
     }
     ngOnInit() {
    this.resetForm();
    }
    resetForm(form?:NgForm){
      if(form!=null)
      form.resetForm();
      this.service2.formData={
        title: '',
    description: '',
    startTime: null,
    endTime: null,
    user: {
        name: '',
    },
    invaitedUsers: [{
        name: ''
    }],
    comment:''
      }
    }
  

  onSubmit(){
    console.log(this.myForm);
  }
  
removeInvitation(invitedUser:FormControl){
  let index= (this.myForm.get('invitedUsers') as FormArray).controls.indexOf(invitedUser);
  (this.myForm.get('invitedUsers') as FormArray).removeAt(index);
}
}
