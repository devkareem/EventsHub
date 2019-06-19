import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnDestroy {


  eventId: string
  eventForm: FormGroup;
  users;
  private paramsub: Subscription;
  private currentEventSub: Subscription;
  private updateSub: Subscription;
  selectedUsers = new FormControl([]);
  constructor(public fb: FormBuilder, public eve: EventService, public rou: ActivatedRoute, private router: Router, private toastr: ToastrService, private datepipe: DatePipe) {
    this.users = eve.getAllUsers();
    this.eventForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startTime: [, Validators.required],
      endTime: [, Validators.required],
      invaitedUsers: [[]]
    });
    this.paramsub = this.rou.params.subscribe(
      params => {
        this.eventId = params['id'];
        if (this.eventId) {
          this.currentEventSub = this.eve.getCurrentEvent(this.eventId).subscribe((res: any) => {
            res.startTime = this.datepipe.transform(res.startTime, "yyyy-MM-ddThh:mm:ss")
            res.endTime = this.datepipe.transform(res.endTime, "yyyy-MM-ddThh:mm:ss")
            this.eventForm.patchValue(res);

          });
        }
      }
    )
  }



  onSubmit() {
    this.updateSub = this.eve.UpdateEvent(this.eventId, this.eventForm.value).subscribe((data) => {
      this.router.navigate(['events']);
      this.toastr.success("Event has been updated", "Events");
    });

  }
  ngOnDestroy(): void {
    if(this.paramsub)this.paramsub.unsubscribe();
   if(this.currentEventSub) this.currentEventSub.unsubscribe();
   if(this.updateSub)this.updateSub.unsubscribe();
  }

}
