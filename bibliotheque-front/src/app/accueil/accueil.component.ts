import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {NgForOf, NgIf} from "@angular/common";
import {BookCardComponent} from "../book-card/book-card.component";
import {FormsModule} from "@angular/forms";
import {Book, Category, User} from "../Models/models";
import {Router} from "@angular/router";


@Component({
  selector: 'accueil-view',
  standalone: true,
  imports: [
    NgForOf,
    BookCardComponent,
    NgIf,
    FormsModule
  ],
  template: `
    <article class="grid" *ngIf="userData"  >
      <a role="button" href="" (click)="navigateToCreateBook($event)">Créer un livre</a>
    </article>
    <article>
      <details class="dropdown">
        <summary>
          Filtre de catégories...
        </summary>
        <ul>
          <li *ngFor="let category of listCategory">
            <label>
              <input type="checkbox" name="solid" [(ngModel)]="category.checked"
                     (change)="updateCheckedCategories(category)"/>
              {{ category.label }}
            </label>
          </li>
        </ul>
      </details>
    </article>

    <div id="book-wrapper">
      <ng-container *ngFor="let book of listBook">
        <book-card-component [value]="book" *ngIf="isCategoryIncluded(book)"></book-card-component>
      </ng-container>
    </div>
    <style>
      #book-wrapper {
        display: flex;
        flex-direction: row;
        gap: 100px;
        flex-wrap: wrap;
      }
    </style>

  `,
  styles : []
})
export class AccueilComponent {
  protected listBook : Book[] | undefined
  protected listCategory : Category[] | undefined
  protected categoryFilter : number[] = [];
  protected userData: User | undefined
  constructor(private apiService: ApiService,private router: Router) {
  }
  updateCheckedCategories(category: Category) {
    if (category.checked) {
      this.categoryFilter.push(category.id);
    } else {
      const index = this.categoryFilter.indexOf(category.id);
      if (index > -1) {
        this.categoryFilter.splice(index, 1);
      }
    }
  }

  isCategoryIncluded(book: Book): boolean {
    return (
      !this.categoryFilter.length ||
      book.categories.some((categoryId) => this.categoryFilter.includes(categoryId.id))
    );
  }

  navigateToCreateBook(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("/createBook");
  }

  ngOnInit(){
    this.apiService.getAllBook().subscribe(response =>{
      // @ts-ignore
      this.listBook = response
      console.log(this.listBook)
    })
    this.apiService.getAllCategory().subscribe(response =>{
      // @ts-ignore
      this.listCategory = response
      console.log(this.listCategory)
    })
    this.apiService.validateToken().subscribe(response => {
      // @ts-ignore
      this.userData = response
    })
  }

}



