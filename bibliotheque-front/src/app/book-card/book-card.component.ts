import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Book, User} from "../Models/models";
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../api.service";
import {UserDataService} from "../user-data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'book-card-component',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  template : `
    <article>
      <img src="{{book.image}}">
      <h3>{{ book.title }}</h3>
      <details>
        <summary>plus de details</summary>
        <p> {{ book.resume }}</p>

        <a role="button" href="" (click)="navigateToUpdateBook($event, book.id)" *ngIf="condition">Modifier le livre</a>
      </details>
      <a *ngIf="userData" routerLink="/book/{{book.id}}">Lire le livre</a>
    </article>
    <style>
      article {
        text-align: center;
        min-width: 350px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    </style>


  `,
  styles:["img{max-height: 465px; max-width: 300px}"]
})
export class BookCardComponent {
  @Input("value")
  book!: Book

  userData! :User

  condition :Boolean = false

  constructor(private apiService: ApiService,private router: Router, private userDataService: UserDataService) {
  }
  navigateToUpdateBook(event : Event, bookId: number | undefined){
    event.preventDefault();
    this.router.navigateByUrl(`updateBook/${bookId}`)
  }
  ngOnInit(){

    this.apiService.validateToken().subscribe(r =>{
      //@ts-ignore
      this.userData = r
      this.condition = (this.userData && (this.userData.roles.some(role =>role.name ==="ADMIN" ) || (this.book.users.some(user => user.id === this.userData.id))))
    })


  }
}

