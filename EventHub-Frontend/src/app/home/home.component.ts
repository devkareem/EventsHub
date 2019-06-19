import { Component, OnInit } from '@angular/core';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public selectedDate: Date;
  public events: SchedulerEvent[];
  private subscription: Subscription;
  constructor(private dashboardServices: DashboardService) {
    this.selectedDate = new Date(Date.now());
    this.getAllEvents();
  }

  ngOnInit() {
  }
  parseAdjust(eventDate: string): Date {
    const date = new Date(eventDate);
    // date.setFullYear(currentYear);
    return date;
  }

  getAllEvents() {
    this.subscription = this.dashboardServices.getDashBoard().subscribe((data: any[]) => {
      this.events = data.map(dataItem => (
        <SchedulerEvent>{
          id: dataItem._id,
          start: this.parseAdjust(dataItem.startTime),
          startTimezone: null,
          end: this.parseAdjust(dataItem.endTime),
          endTimezone: null,
          isAllDay: false,
          title: dataItem.title,
          description: dataItem.description,
          recurrenceRule: null,
          recurrenceId: null,
          recurrenceException: null,

          roomId: dataItem.RoomID,
          ownerID: dataItem.owner._id
        }
      ));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
