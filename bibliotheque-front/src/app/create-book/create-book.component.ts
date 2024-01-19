import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Book, Category, User} from "../Models/models";
import {ApiService} from "../api.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
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
          <textarea id="longText" name="longText" rows="4" cols="50" [(ngModel)]="currentBook.resume" style="resize: none;">
          </textarea>
        </label>
        <details class="dropdown">
          <summary>
            Liste des catégories
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
        <div class="grid">
          <label for="image">
            Url de l'image
            <input type="url" id="image" name="image" placeholder="Url de l'image" [(ngModel)]="currentBook.image" required>
          </label>
          <img src="{{currentBook.image}}" alt="">
        </div>
        <p id="errorMessage">{{errorMessage}}</p>
        <button type="submit" >Submit</button>
      </form>
    </article>

  `,
  styles : ["img {margin: 40px 0;} #errorMessage{color: red;text-align: center; font-weight: 500} img{max-height: 500px}"]
})
export class CreateBookComponent {
  constructor(private apiService: ApiService,private router: Router) {
  }
  protected userData: User | undefined
  protected listCategory : Category[] | undefined
  protected categoryCheckedList : number[] = [];
  protected errorMessage : String = "";
  protected currentBook:{
    title: string,
    resume: string,
    image: string,
    categories: Category[],
    user: User[]
  } = {
    title: "",
    resume: "",
    image: "",
    categories : [],
    user : []
  }
  updateCheckedCategories(category: Category) {

    if (category.checked) {
      this.categoryCheckedList.push(category.id);
    } else {
      const index = this.categoryCheckedList.indexOf(category.id);
      if (index > -1) {
        this.categoryCheckedList.splice(index, 1);
      }
    }
  }
  isValidBook() : Boolean {
    return (
      (this.currentBook.title != "") && (this.currentBook.resume != "") && (this.currentBook.image != "")
    )
  }
  submitBook(event: Event){
    this.errorMessage = ""
    if (this.isValidBook()){
      // @ts-ignore
      this.categoryCheckedList.map(categoryId =>{
        this.currentBook.categories.push({checked: false, label: "", id : categoryId});
      })
      // @ts-ignore
      this.currentBook.user.push({id : this.userData?.id})
      this.apiService.createBook(this.currentBook).subscribe(response =>{
          alert("Livre ajouté")
          this.router.navigateByUrl("")
        },error => {
          this.errorMessage = error.message
        }
      )
    }
    else {
      this.errorMessage = "Livre incorrecte"
    }
  }
  ngOnInit(){
    this.apiService.getAllCategory().subscribe(response =>{
      // @ts-ignore
      this.listCategory = response
    })
    this.apiService.validateToken().subscribe(response => {
      // @ts-ignore
      this.userData = response
    },
      error => {
        this.router.navigateByUrl("")
      }
    )

  }
}
