import { Component, OnInit,OnDestroy } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { IEventElement } from '../../events/IEvents'
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-invited-events',
  templateUrl: './invited-events.component.html',
  styleUrls: ['./invited-events.component.css']
})
export class InvitedEventsComponent implements OnDestroy {

  displayedColumns: string[] = ['title', 'description', 'startTime', 'endTime', 'writeComment' , 'eventType'];
  dataSource: IEventElement[];
  private subscription: Subscription;
  private deleteSub: Subscription;

  constructor(public dbs: DashboardService, private datepipe: DatePipe) {
    this.getAllEvent();
  }

  ngOnInit() {
  }

  getAllEvent() {
    this.subscription = this.dbs.getDashBoard().subscribe((data: any) => {
      this.dataSource = data.map(dataItem => (
        <IEventElement>{
          id: dataItem._id,
          description: dataItem.description,
          endTime: this.datepipe.transform(dataItem.endTime, "yyyy-MM-dd hh:mm:ss"),
          startTime: this.datepipe.transform(dataItem.startTime, "yyyy-MM-dd hh:mm:ss"),
          title: dataItem.title,
          ownerId: dataItem.owner._id
        }
      ));

    });

  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
