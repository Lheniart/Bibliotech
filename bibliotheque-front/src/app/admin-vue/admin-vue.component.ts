import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {ApiService} from "../api.service";
import {UserDataService} from "../user-data.service";

@Component({
  selector: 'admin-vue',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  template : `

  <article>
    <nav>
      <ul>
        <li><a role="button" routerLink="users">Gérer les utilisateurs</a></li>
        <li><a role="button" routerLink="categories">Gérer les catégories</a></li>
      </ul>
    </nav>
  </article>
    <router-outlet></router-outlet>

  `,
  styles : []
})
export class AdminVueComponent {
  constructor(private apiService: ApiService,private router: Router, private userDataService: UserDataService) {
  }
}
