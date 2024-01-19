import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {User} from "../Models/models";
import {ApiService} from "../api.service";
import {UserDataService} from "../user-data.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'profile-view',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  template: `
<article>
  <nav aria-label="breadcrumb">
    <ul>
      <li><a routerLink="myBook">Mes livres</a></li>
      <li><a routerLink="info">Mes informations</a></li>
      <li><a *ngIf="condtion" routerLink="admin">Administration</a></li>
    </ul>
  </nav>
</article>
<router-outlet></router-outlet>

  `,
  styles: []
})
export class ProfileComponent {
  userData! :User
  condtion : Boolean = false
  constructor(private apiService: ApiService,private router: Router, private userDataService: UserDataService) {
  }
  ngOnInit() {
    this.apiService.validateToken().subscribe(
      r =>{
        //@ts-ignore
        this.userData = r
        this.condtion = this.userData.roles.some(role => role.name === "ADMIN")
      },
      error => {
        this.router.navigateByUrl("")
      })
  }
}
