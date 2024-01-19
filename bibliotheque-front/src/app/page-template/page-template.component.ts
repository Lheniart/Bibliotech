import {Component, Input} from '@angular/core';
import {Book, Page, updatePageDto, User} from "../Models/models";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ApiService} from "../api.service";

@Component({
  selector: 'page-template-component',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  template: `

    <label for="switch" style="text-align: center" *ngIf="calculateCondition()">
      <input type="checkbox" id="switch" name="switch" role="switch" [(ngModel)]="editPage">
      Editer la page
    </label>
    <div id="page-wrapper">
      <h3 *ngIf="!editPage">{{ page.title }}</h3>
      <label *ngIf="editPage" for="pageTitle">
        Titre :
        <input type="text" id="pageTitle" name="pageTitle" placeholder="Titre de la page" [(ngModel)]="page.title"
               required style="max-width: 300px">
      </label>

      <textarea *ngIf="!editPage" id="content-page" rows="30" cols="75" style="resize: none;"
                [(ngModel)]="page.content" readonly></textarea>
      <textarea *ngIf="editPage" id="content-page" rows="30" cols="75" style="resize: none;"
                [(ngModel)]="page.content"></textarea>
      <div id="date-wrapper">
        <p>Date de publication : {{ page.createdAt.split("T")[0] }}</p>
        <p>Mis à jour : {{ page.updatedAt.split("T")[0] }} à {{ page.updatedAt.split("T")[1].slice(0, -3) }} </p>
      </div>
      <p id="errorMessage">{{ errorMessage }}</p>
      <button type="submit" style="max-width: 400px" *ngIf="editPage" (click)="updatePage($event)">Modifier cette page
      </button>
      <button style="max-width: 250px; background-color: #c21e1e" *ngIf="editPage" (click)="deletePage($event)">Supprimer la page</button>

    </div>

    <style>
      * {
        text-align: center;
      }

      #page-wrapper {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      #content-page {
        width: auto;
      }

      #date-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
      }

    </style>
  `,
  styles: []
})

export class PageTemplateComponent {
  constructor(private apiService: ApiService) {
  }

  @Input("page")
  page!: Page;

  @Input("book")
  book!: Book

  protected userData!: User

  editPage: boolean = false
  errorMessage: string = "";

  updateBookDto: updatePageDto = {
    title: "",
    content: "",
    book : -1
  }

  ngOnInit() {
    this.apiService.validateToken().subscribe(response => {
      this.userData = <User>response
      this.calculateCondition();
    })
  }

  calculateCondition() {
    return (this.userData.roles.some(role => role.name === "ADMIN") || this.book.users.some(user => user.id === this.userData.id))
  }

  updatePage(event: Event) {
    event.preventDefault();
    this.updateBookDto.title = this.page.title;
    this.updateBookDto.content = this.page.content;
    if (this.book.id != null) {
      this.updateBookDto.book = this.book.id
    }
    this.apiService.updatePage(this.page.id, this.updateBookDto).subscribe(
      response =>{
        alert("Page modifié")
        window.location.reload()
      },
      err =>{
        this.errorMessage = err.message;
      }
    )

  }
  deletePage(event : Event){
    event.preventDefault()
    const choix = window.confirm("Voulez-vous vraiment supprimer la page ?")
    if (choix){
      this.apiService.deletePage(this.page.id).subscribe()
    }
    window.location.reload()
  }



}
