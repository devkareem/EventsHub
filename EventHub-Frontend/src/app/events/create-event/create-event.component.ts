import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, NgForm } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }
  myForm: FormGroup;
  users;
  private createSub: Subscription;
  constructor(fb: FormBuilder, public eventService: EventService, private router: Router, private toastr: ToastrService, private authService: AuthService) {
    this.users = eventService.getAllUsers();
    console.log(this.users);
    this.myForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      invaitedUsers: [[]]
    });
  }
  onSubmit() {
    let event = this.myForm.value;
    event.owner = this.authService.currentUser;
    this.createSub = this.eventService.createEvent(event).subscribe(data => {
      this.router.navigate(['events']);
      this.toastr.success("Event has been created", "Events");
      this.createSub.unsubscribe();

    });

  }
  ngOnDestroy(): void {
  }
}
