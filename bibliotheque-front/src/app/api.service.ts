import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {resolve} from "@angular/compiler-cli";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080"
  signIn(signInDto: Object){
    return this.http.post(`${this.baseUrl}/auth/login`, signInDto).pipe(
      catchError(err => {
        return throwError(() => new Error('Identifiant incorrecte'));
      })
    )
  }
  getAllBook(){
    return this.http.get("http://localhost:8080/book").pipe(
      catchError(err => {
        console.log(err);
        return of();
      })
    )
  }
  getAllCategory() {
    return this.http.get("http://localhost:8080/categories").pipe(
      catchError(err => {
        console.log(err);
        return of();
      })
    )
  }
  validateToken(): Observable<Object> {
    let token = localStorage.getItem('token')
    if (token){
      return this.http.post("http://localhost:8080/auth/validToken",token).pipe(
      catchError(err => {
        console.log(err);
        return of();
      })
      )
    }
    else {
      return throwError(() => new Error('Token non validé'));
    }
  }
  createBook(data: Object) : Observable<Object>{
    let token = localStorage.getItem('token')

    if (token){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.post("http://localhost:8080/book",data, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    }
    else {
      return throwError(() => new Error('Token non validé'));
    }
  }
}
interface User{
  id : number,
  email: string,
  firstName : string,
  lastName: string,
  roles : [],
}
