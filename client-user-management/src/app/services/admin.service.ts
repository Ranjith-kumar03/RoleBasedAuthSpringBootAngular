import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

let API_URL = "http://localhost:8080/api/admin/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const hea_ders = new HttpHeaders(this.currentUser  ? {
      authorization: 'Basic ' + btoa(this.currentUser.username + ':' + this.currentUser.password)
    } : {});


    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });


  }

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "all", {headers: this.headers});
  }

  register(user: User): Observable<any> {
    console.log("register ad min service invoked clicked");
    console.log(API_URL + "registration");
    console.log(user);
    return this.http.post(API_URL + 'registration', JSON.stringify(user),
      {headers: this.headers});//{headers: {"Content-Type":"application/json; charset=UTF-8"}}
  }
}
