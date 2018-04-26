import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '@env/environment';
// import { Http, Response } from '@angular/http';
const API_URL = env.apiUrl
@Injectable({
  providedIn: 'root',
})
export class BooksService {

  constructor(private http: HttpClient) { 
  }
  getUserList():Observable<any>{
    return this.http.get(API_URL+'/users')
    
  }
  getRecommendedBooks(user):Observable<any>{
    console.log(API_URL+'/recommended-books/'+user);
    return this.http.get(API_URL+'/recommended-books/'+user);
  }
  getPastBooks(user):Observable<any>{
    return this.http.get(API_URL+'/past-books/'+user);
  }
  
}
