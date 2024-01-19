import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Router, RouterLink} from "@angular/router";
import {User} from "../Models/models";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-gestion',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  template: `
    <article class="user-wrapper">
      <h2>Liste des utilisateurs</h2>
      <table class="striped">
        <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">roles</th>
          <th scope="col">delete</th>
        </tr>
        </thead>
        <tbody>
            <tr *ngFor="let user of listUser">
              <th scope="row"> <a routerLink="/profile/admin/user/{{user.id}}">{{ user.lastName}}</a></th>
              <th >{{ user.firstName}}</th>
              <th style="max-width: 200px"><select>
                <option *ngFor="let role of user.roles">{{role.name}}</option>
              </select> </th>
              <th><a (click)="deleteUser($event, user.id)">delete</a></th>
            </tr>
        </tbody>
      </table>
    </article>
    <style>
      .user-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      select{
        max-width: 200px;
      }
      table{
        text-align: center;
        max-width: 800px;
      }
    </style>

  `,
  styles :[]
})
export class UserGestionComponent {
  protected listUser: User[] = []
  constructor(private apiService: ApiService,private router: Router) {
  }
  ngOnInit(){
    this.apiService.getAllUser().subscribe(
      response => {
        // @ts-ignore
        this.listUser = response
      }
    )
  }
  deleteUser(event:Event, id: number){
    event.preventDefault();
    let choix = window.confirm("Voulez-vous vraiment supprimer l'utilisateur ?")
    if(choix){
      this.apiService.deleteUser(id).subscribe(
        r =>{
          alert(r)
          window.location.reload()
        }
      )
    }
  }
}
