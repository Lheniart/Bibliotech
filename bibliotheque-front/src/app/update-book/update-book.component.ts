import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {Book, BookDto, Category, Page, User} from "../Models/models";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {UserDataService} from "../user-data.service";
import {map, Subscription} from "rxjs";
import {check} from "typed-assert";

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  template: `
    <article>
      <form (submit)="submitBook($event)">
        <label for="title">
          Titre
          <input type="text" id="title" name="title" placeholder="Titre" [(ngModel)]="currentBook.title" required>
        </label>
        <label for="resume">
          Résumée
          <textarea id="longText" name="longText" rows="4" cols="50" [(ngModel)]="currentBook.resume"
                    style="resize: none;">
          </textarea>
        </label>
        <details class="dropdown">
          <summary>
            Liste des catégories
          </summary>
          <ul>
            <li *ngFor="let category of listCategory; let i = index">
              <label>
                <input *ngIf="category.checked" type="checkbox" name="solid"
                       (change)="updateCheckedCategories(category, $event)" checked/>
                <input *ngIf="!category.checked" type="checkbox" name="solid"
                       (change)="updateCheckedCategories(category, $event)"/>
                {{ category.label }}
              </label>
            </li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>
            Liste des utilisateurs
          </summary>
          <ul id="listUser">
            <ng-container *ngFor="let user of listUser; let i = index">
              <li *ngIf='user.lastName != "" && user.firstName != ""'>
                <label>
                  <input *ngIf="user.checked" type="checkbox" name="solid" (change)="updateCheckedUsers(user, $event)"
                         checked/>
                  <input *ngIf="!user.checked" type="checkbox" name="solid"
                         (change)="updateCheckedUsers(user, $event)"/>
                  {{ user.firstName }} {{ user.lastName }}
                </label>
              </li>
            </ng-container>

          </ul>
        </details>
        <div class="grid">
          <label for="image">
            Url de l'image
            <input type="url" id="image" name="image" placeholder="Url de l'image" [(ngModel)]="currentBook.image"
                   required>
          </label>
          <img src="{{currentBook.image}}" alt="">
        </div>
        <p id="errorMessage">{{ errorMessage }}</p>
        <button type="submit">Submit</button>
      </form>
    </article>
    <style>
      #listUser {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        flex-wrap: wrap;
        gap: 50px;
      }
    </style>

  `,
  styles: ["img {margin: 40px 0;} #errorMessage{color: red;text-align: center; font-weight: 500} img{max-height: 500px} li{list-style: none} "]
})
export class UpdateBookComponent {

  id: number = -1;
  protected userData!: User
  protected listCategory: Category[] = []
  protected listUser: User[] = []
  protected errorMessage: String = "";

  protected currentBook: {
    title: string,
    resume: string,
    image: string,
    categories: Category[]
    users: User[]

  } = {
    title: "",
    resume: "",
    image: "",
    categories: [],
    users: []
  }
  bookDto: BookDto = {
    title: "",
    resume: "",
    image: "",
    categories: [],
    users: []
  }

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.apiService.getAllCategory().subscribe(response => {
      // @ts-ignore
      this.listCategory = response
    })
    this.apiService.getAllUser().subscribe(
      response => {
        // @ts-ignore
        this.listUser = response
        console.log(this.listUser)
      }
    )
    this.userDataService.getUserData().subscribe(userData => {
      console.log(userData)
      this.userData = userData;
    });

    this.apiService.getBookById(this.id).subscribe(async response => {
      console.log(response)
      // @ts-ignore
      this.currentBook = response
      console.log(this.currentBook.users)
      console.log(this.listUser)
      this.currentBook.users.some(user => {
        for (let userElement of this.listUser) {
          if (user.id == userElement.id) {
            console.log("test")
            console.log(user.id)
            userElement.checked = true
          }
        }
      })
      const matchingCategories = this.listCategory.filter(category =>
        this.currentBook.categories.some(categoryElement => categoryElement.id === category.id)
      );
      matchingCategories.forEach(matchingCategory => matchingCategory.checked = true);
    })
    this.apiService.validateToken().subscribe(
      response => {

      },
      error => {
        this.router.navigateByUrl("")
      }
    )


  }

  transformBookToBookDto(book: Book): BookDto {
    return {
      title: book.title,
      resume: book.resume,
      image: book.image,
      categories: book.categories,
      users: book.users // Assurez-vous que 'user' dans 'Book' et 'users' dans 'BookDto' sont du même type
    };
  }

  submitBook(event: Event) {
    const checkedCategories = this.listCategory.filter(category => category.checked);
    const checkedUsers = this.listUser.filter(user => user.checked)
    this.bookDto.title = this.currentBook.title;
    this.bookDto.resume = this.currentBook.resume;
    this.bookDto.categories = checkedCategories;
    this.bookDto.image = this.currentBook.image;
    this.bookDto.users = checkedUsers;
    console.log(this.bookDto)
    this.apiService.updateBook(this.id, this.bookDto).subscribe(
      response =>{
        alert("Livre modifier")
        this.router.navigateByUrl("")
      },
      error => {
        console.log(error)
        alert("Erreur : " + error.message)
        this.router.navigateByUrl("")
      }
    )
  }

  protected readonly check = check;

  updateCheckedCategories(category: Category, event: any) {
    this.listCategory = this.listCategory.map(cat =>
      cat.id === category.id ? {...cat, checked: event.target.checked} : cat
    );
    console.log(this.listCategory);
  }

  updateCheckedUsers(user: User, event: any) {
    this.listUser = this.listUser.map(cat =>
      cat.id === user.id ? {...cat, checked: event.target.checked} : cat
    );
    console.log(this.listUser);
  }
}
