import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ApiService} from "../api.service";
import {Book} from "../Models/models";
import {BookCardComponent} from "../book-card/book-card.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-my-book',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  template: `
    <article class="grid">
      <a role="button" href="" routerLink="/createBook">Créer un livre</a>
    </article>
    <div id="book-wrapper">

      <ng-container *ngFor="let book of listBook">
        <book-card-component [value]="book"></book-card-component>
      </ng-container>
    </div>
    <style>
      #book-wrapper {
        display: flex;
        flex-direction: row;
        gap: 100px;
        flex-wrap: wrap;

        justify-content: center;
      }

    </style>
  `,
  styles: []
})
export class MyBookComponent {

  constructor(private router: Router, private apiService: ApiService) {
  }
  protected userId: number = -1
  protected listBook : Book[] | undefined
  ngOnInit(){
    this.apiService.validateToken().subscribe(
      response => {
        //@ts-ignore
        this.userId = response.id
        this.apiService.getUserBook(this.userId).subscribe(
          response =>{
            // @ts-ignore
            this.listBook = response
          }
        )

      },
      error => {
        this.router.navigateByUrl("")
      }
    )


  }
}
