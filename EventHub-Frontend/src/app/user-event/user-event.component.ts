import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { UsersServiceService } from '../services/users-service.service'
import { EventService } from '../services/event.service'
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})

export class UserEventComponent implements OnInit {
  public userId: string
  public eventId: string
  public userEventsForm: FormGroup;
  public eventData;
  public commentData;
  public paramsub;
  constructor(public formBuilder: FormBuilder, public us: UsersServiceService, private au: AuthService, public ev: EventService, public rou: ActivatedRoute) {

    this.userEventsForm = this.formBuilder.group({
      'comment': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.eventData = { owner: {} };

    this.userId = this.au.currentUser ? this.au.currentUser._id : null;
    if (this.userId) {
      this.paramsub = this.rou.params.subscribe(params => {
        this.eventId = params['id'];
        if (this.eventId) {
          this.loadEventData();
        }
      });
    }
  }

  loadEventData() {
    this.ev.getCurrentEvent(this.eventId).subscribe((res: any) => {
      console.log(res);
      this.eventData = res;
      this.userEventsForm.patchValue(this.eventData);
    });
  }

  onSubmit() {
    this.commentData = this.userEventsForm.value;
    this.commentData._id = this.au.currentUser._id;
    this.commentData.name = this.au.currentUser.name;

    console.log(this.commentData);
    this.us.writeCommentOnEvent(this.eventId, this.commentData).subscribe((res) => {
      console.log(res);
      this.userEventsForm.controls['comment'].setValue('');
      this.loadEventData();
    });
  }

}
