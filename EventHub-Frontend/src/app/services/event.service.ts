import { Injectable } from '@angular/core';
import { EventClass } from '../model/model.events';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  formData:EventClass;

  apiUrl="http://localhost:8080/events";
  

  constructor(private http:HttpClient) { 
}
getEvents(): Observable<EventClass[]> {
  return this.http.get<EventClass[]>(this.apiUrl);
}

createEvent(event: EventClass): Observable<any> {
  return this.http.post(this.apiUrl, event);
}

}
