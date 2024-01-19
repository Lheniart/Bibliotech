import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";

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
    return this.http.post(`${this.baseUrl}/auth/register`, registerDto, {responseType: 'text'}).pipe(
      tap(response => {
      }),
      catchError(err => {
        return throwError(() => new Error(err.error));
      })
    )

  }

  getAllBook() {
    return this.http.get("http://localhost:8080/book").pipe(
      catchError(err => {
        return of();
      })
    )
  }

  getBookById(bookId: number) {
    return this.http.get(`http://localhost:8080/book/${bookId}`).pipe(
      catchError(err => {
        return of();
      })
    )
  }

  getAllCategory() {
    return this.http.get("http://localhost:8080/categories").pipe(
      catchError(err => {
        return of();
      })
    )
  }

  validateToken(): Observable<Object> {
    let token = localStorage.getItem('token')
    if (token) {
      return this.http.post("http://localhost:8080/auth/validToken", token).pipe(
        catchError(err => {
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
      return this.http.put(`http://localhost:8080/book/${bookId}`, data, httpOptions).pipe(
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
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Non connecté'));
    }
  }
  getUserById(id : number){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get(`http://localhost:8080/user/${id}`, httpOptions).pipe(
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
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.put("http://localhost:8080/user/resetPassword/"+userId, data, httpOptions).pipe(
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
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }

  updateCategory(id: number, name :string){
    const data = {
      label: name
    }
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.put(`http://localhost:8080/categories/${id}`, data,httpOptions).pipe(
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }
  addCategory(name :string){
    const data = {
      label: name
    }
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.post(`http://localhost:8080/categories`,data, httpOptions).pipe(
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }
  deleteCategory(id : number){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        }),
        responseType: 'text' as 'json'
      };
      return this.http.delete(`http://localhost:8080/categories/${id}`, httpOptions).pipe(
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }
  deleteUser(id : number){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        }),
        responseType: 'text' as 'json'
      };
      return this.http.delete(`http://localhost:8080/user/${id}`, httpOptions).pipe(
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }

  deleBooke(id: number){
    let token = localStorage.getItem('token')
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        }),
        responseType: 'text' as 'json'
      };
      return this.http.delete(`http://localhost:8080/book/${id}`, httpOptions).pipe(
        catchError(err => {
          return throwError(() => new Error(err.message));
        })
      )
    } else {
      return throwError(() => new Error('Token non validé'));
    }
  }


}

