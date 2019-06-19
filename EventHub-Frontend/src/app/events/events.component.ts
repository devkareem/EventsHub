import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../services/event.service';
import { IEventElement } from './IEvents'
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnDestroy {

  displayedColumns: string[] = ['title', 'description', 'startTime', 'endTime', 'update', 'delete'];
  dataSource: IEventElement[];
  private subscription: Subscription;
  private deleteSub: Subscription;
  constructor(public eventService: EventService, private datepipe: DatePipe) {
    this.getAllEvent();
  }

  getAllEvent() {
    this.subscription = this.eventService.getAllEvents().subscribe((data: any) => {
      this.dataSource = data.data.map(dataItem => (
        <IEventElement>{
          id: dataItem._id,
          description: dataItem.description,
          endTime: this.datepipe.transform(dataItem.endTime, "yyyy-MM-dd hh:mm:ss"),
          startTime: this.datepipe.transform(dataItem.startTime, "yyyy-MM-dd hh:mm:ss"),
          title: dataItem.title
        }
      ));

    });

  }

  deleteEvent(event) {
    if (confirm("Are you sure to delete " + event.title)) {
      this.deleteSub = this.eventService.DeleteEvent(event.id).subscribe(data => {
        this.dataSource = this.dataSource.filter(ele => ele.id != event.id);
        this.deleteSub.unsubscribe();
      });
    }
  }

  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }

}
