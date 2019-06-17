import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  baseUrl: String = "http://localhost:8080";
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    let token = localStorage.token;
    if (token) {
      this.currentUser = this.helper.decodeToken(token);
    }
  }

  async login(credentials) {
    try {
      let result: any = await this.http.post(this.baseUrl + '/api/auth', credentials).toPromise();
      if (result && result.token) {
        localStorage.token = result.token;
        this.currentUser = this.helper.decodeToken(result.token);
        return {status:true};
      }
      else return {status:false,message:result.message};
    } catch (error) {
      console.error(error.message);

    }

  }
  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    if (!localStorage.token) return false;
    return this.helper.isTokenExpired(localStorage.token);
  }
}
