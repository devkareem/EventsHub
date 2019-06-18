import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl: String = "http://localhost:8080";
  constructor(private http: HttpClient) { }
  getDashBoard(){
    return this.http.get(this.baseUrl+'/api/dashbord/');
  }
}
