import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {resolve} from "@angular/compiler-cli";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = "http://localhost:8080"

  signIn(signInDto: Object) {
    return this.http.post(`${this.baseUrl}/auth/login`, signInDto).pipe(
      catchError(err => {
        return throwError(() => new Error('Identifiant incorrecte'));
      })
    )
  }

  register(registerDto: object) {
    console.log("test")
    return this.http.post(`${this.baseUrl}/auth/register`, registerDto, {responseType: 'text'}).pipe(
      tap(response => {
        console.log('API Response:', response);
      }),
      catchError(err => {
        console.log(err)
        return throwError(() => new Error(err.error));
      })
    )

  }

  getAllBook() {
    return this.http.get("http://localhost:8080/book").pipe(
      catchError(err => {
        console.log(err);
        return of();
      })
    )
  }

  getBookById(bookId: number) {
    return this.http.get(`http://localhost:8080/book/${bookId}`).pipe(
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
    if (token) {
      return this.http.post("http://localhost:8080/auth/validToken", token).pipe(
        catchError(err => {
          console.log(err);
          return of();
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }

  createBook(data: Object): Observable<Object> {
    let token = localStorage.getItem('token')

    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.post("http://localhost:8080/book", data, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }

  updateBook(bookId: number, data: Object): Observable<Object> {
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      console.log(data)
      return this.http.put(`http://localhost:8080/book/${bookId}`, data, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Non connecté'));
    }
  }

  getAllUser() {
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get(`http://localhost:8080/user`, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Non connecté'));
    }
  }

  updateUser(userId : number, data : Object){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.put("http://localhost:8080/user/"+userId, data, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }
  resetPassword(userId : number, data : Object){
    let token = localStorage.getItem('token')
    console.log(data)
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.put("http://localhost:8080/user/resetPassword/"+userId, data, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }
  getUserBook(userId : number){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get(`http://localhost:8080/book/${userId}/user`, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }
  getPageByBookId(bookId : number){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get(`http://localhost:8080/page/${bookId}/book`, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }

  updatePage(id: number, data: any){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.put(`http://localhost:8080/page/${id}`,data, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }

  addNewPage(data : any){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.post(`http://localhost:8080/page`,data, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }
  deletePage(id : number){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.delete(`http://localhost:8080/page/${id}`, httpOptions).pipe(
        tap(r => console.log(r)),
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }

}

