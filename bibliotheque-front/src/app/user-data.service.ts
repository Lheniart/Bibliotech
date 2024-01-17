import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Book, User} from "./Models/models";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userSubject: Subject<User> = new Subject<User>();

  constructor() { }

  setUserData(user: User) {
    this.userSubject.next(user);
  }
  getUserData(): Observable<User> {
    return this.userSubject.asObservable();
  }
}
