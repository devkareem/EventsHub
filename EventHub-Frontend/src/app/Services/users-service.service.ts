import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  public myHeaders: any

  constructor(public http: HttpClient) { 
    this.myHeaders = new Headers();
    this.myHeaders.append('Content-Type', 'application/json');
  }

  registerNewUser(usersData) {
    return this.http.post('http://localhost:8080/register', usersData);
  }

  getCurrentUserData(userId:string) {
    //console.log(userId);
    return this.http.get('http://localhost:8080/users/' + userId);
  }

  getAllUsers() {
    return this.http.get('http://localhost:8080/users');
  }

  UpdateUser(userId:string,usersData) {
    return this.http.put('http://localhost:8080/users/' + userId,usersData);
  }

  DeleteUser(userId:string) {
    return this.http.delete('http://localhost:8080/users/' + userId);
  }

  writeCommentOnEvent(eventId : string, commentData: any)
  {
    return this.http.put('http://localhost:8080/users/writecomment/' + eventId,commentData);
  }
}
