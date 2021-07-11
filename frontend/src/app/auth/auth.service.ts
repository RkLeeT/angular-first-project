import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _data: string = 'from angular'
  public _url: string = 'http://localhost:3000/auth/store'

  public loginUrl: string = 'http://localhost:3000/auth/login'
  public registerUrl: string = 'http://localhost:3000/auth/register'
  public verifyUrl: string = 'http://localhost:3000/auth/verify'

  constructor(private http: HttpClient, private router: Router) { }

  postData() {
    return this.http.post(this._url, this._data)
  }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  async verify() {
    return await this.http.get(this.verifyUrl)
  }

  getUsername() {
    return localStorage.getItem('username')
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.router.navigate(['/'])
  }
}
