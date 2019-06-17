import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyCustomHttpService {
  constructor(public http:HttpClient) { 
  
  }
  getData() : Observable<Object>{
    return this.http.get('https://jsonplaceholder.typicode.com/users');
}
}
