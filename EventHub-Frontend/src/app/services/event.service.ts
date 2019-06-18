import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public events;
  public myHeaders: any;
  

  constructor(private http:HttpClient) { 
}

createEvent(eventsData) {
  this.events = eventsData;
  this.http.post('http://localhost:8080/api/events', eventsData).subscribe((res) => {
    //console.log(res);
  });
}
getCurrentEvent(eventId:string) {
  console.log(eventId);
  return this.http.get('http://localhost:8080/api/events/' + eventId);
}

getAllEvents() {
  return this.http.get('http://localhost:8080/api/events');
}
getAllUsers() {
  return this.http.get('http://localhost:8080/api/events/users');
}

UpdateEvent(eventId:string,eventsData) {
  this.http.put('http://localhost:8080/api/events/' + eventId,eventsData).subscribe((res) => {
    //console.log(res);
  });
}

DeleteEvent(eventId:string) {
  return this.http.delete('http://localhost:8080/events/' + eventId);
}

}
