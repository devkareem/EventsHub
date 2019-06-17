import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  public users;
  public myHeaders: any

  constructor(public http: HttpClient) { 
    this.myHeaders = new Headers();
    this.myHeaders.append('Content-Type', 'application/json');
  }

  registerNewUser(usersData) {
    this.users = usersData;
    this.http.post('http://localhost:8080/users', usersData).subscribe((res) => {
      console.log(res);
    });
  }

  getCurrentUserData() {
    this.http.get('http://localhost:8080/users/5d076a30ef041b094060f4cc').subscribe((res:any) => { 
      if(res.status === 'OK' ){
        this.users = res.data;
        console.log(this.users);
      }
    });
    return this.users;
  }
}
