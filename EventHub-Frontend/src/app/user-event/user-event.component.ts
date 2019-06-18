import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { UsersServiceService } from '../Services/users-service.service'
import { EventService } from '../Services/event.service'
import { AuthService } from '../auth.service';

import { Tile } from '../TitleGrid'

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})
export class UserEventComponent implements OnInit {
  public userId: any
  public userEventsForm: FormGroup;
  public eventData;
  public comments;

  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(public formBuilder: FormBuilder, public us: UsersServiceService, private au: AuthService, public ev:EventService) {

    this.userEventsForm = this.formBuilder.group({
      // 'street' : [''],
      'comment': [Validators.required]

    });

    this.userId = this.au.currentUser ? this.au.currentUser._id : null;
    if (this.userId) {
      // this.us.getCurrentUserData(this.userId).subscribe((res: any) => {
      //   console.log(res);
      //   if (res.status === 'OK') {
      //     console.log(res);
      //     //this.userEventsForm.patchValue(res.data);
      //   }
      // });
    }
  }

  ngOnInit() {
  }

}
