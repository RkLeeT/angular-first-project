import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Detail } from './details/detail';
import { Post } from './details/post';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public _url:string = 'assets/data/details.json';
  public _jsonurl:string = 'https://jsonplaceholder.typicode.com/posts';
  
  constructor(private http: HttpClient) { }

  getDetails() {
    return [
      {"id": 1, "name": "A", "age": 21},
      {"id": 2, "name": "B", "age": 24},
      {"id": 3, "name": "C", "age": 25},
      {"id": 4, "name": "D", "age": 23},
      {"id": 5, "name": "E", "age": 22}
    ];
  }

  getHttpDetails(): Observable<Detail[]> {

    // return this.http.get(this._url, { responseType: 'text'});

    return this.http.get<Detail[]>(this._url)
    // .pipe(
    //   catchError(this.errorHandler)
    // );
  }

  getJsonData(): Observable<Post[]> {
    // return this.http.get<Post[]>(this._jsonurl).pipe(
    //   catchError(this.errorHandler)
    //   );

    // const headers = new HttpHeaders({
    //   'usuage': 'Http Call to JsonPlaceHolder'
    // })

    let params = new HttpParams().append('_limit', '5');

    return this.http.get<Post[]>(this._jsonurl, { observe: 'response', params: params})
    .pipe(
      tap(response => console.log(response)),
      map(response => response.body),
      // catchError(this.errorHandler)
    )
  }

  // errorHandler(error: HttpErrorResponse) {
  //   return throwError(error.message || "Server Error");
  // }
}
