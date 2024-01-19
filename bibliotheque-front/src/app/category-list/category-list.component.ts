import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {UserDataService} from "../user-data.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Category} from "../Models/models";

@Component({
  selector: 'add-category-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    FormsModule
  ],
  template: `

    <article class="category-wrapper">
      <h2>Liste des catégories</h2>
      <label for="switch" style="text-align: center">
        <input type="checkbox" id="switch" name="switch" role="switch" [(ngModel)]="editPage">
        Editer les catégories
      </label>
      <div *ngFor="let category of listCategory" class="grid" style="max-width: 700px">
        <input *ngIf="!editPage" type="text" id="categoryName" name="categoryName" [(ngModel)]="category.label" readonly>
        <input *ngIf="editPage"  type="text" id="categoryName" name="categoryName" [(ngModel)]="category.label">
        <button *ngIf="editPage" (click)="updateCategory($event, category.id, category.label)">Modifier</button>
        <button *ngIf="editPage" (click)="deleteCategory($event, category.id)" style="background-color: darkred" >Supprimer</button>
      </div>

    </article>
    <article class="category-wrapper">
      <h2>Ajouter une catégorie</h2>
      <form>
        <label for="name">Nom de la catégorie</label>
        <input type="text" id="name" name="name" placeholder="Nom de la catégorie" [(ngModel)]="newCategoryName" required>
        <button  (click)="createCategory($event, newCategoryName)">Ajouter</button>
      </form>
    </article>
    <style>
      input, button{
        max-width: 400px;
        text-align: center;
      }
      .category-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    </style>
  `,
  styles: []
})
export class CategoryListComponent {
  constructor(private apiService: ApiService,private router: Router) {
  }
  newCategoryName : string = ""
  protected listCategory : Category[] | undefined
  editPage: boolean = false
  ngOnInit(){
    this.apiService.getAllCategory().subscribe(response =>{
      // @ts-ignore
      this.listCategory = response
    })
  }

  updateCategory(event : Event,id : number, name : string){
    event.preventDefault();
    this.apiService.updateCategory(id, name).subscribe(
      r =>{
        alert("Catégorie modifié")
      }
    )
  }
  createCategory(event : Event,name: string){
    event.preventDefault();
    this.apiService.addCategory(name).subscribe(
      r =>{
        alert("Catégorie ajouté")
        window.location.reload()
      }
    )
  }
  deleteCategory(event: Event, id : number){
    event.preventDefault();
    this.apiService.deleteCategory(id).subscribe(
      r =>{
        alert(r)
        window.location.reload()
      }
    )
  }
}
