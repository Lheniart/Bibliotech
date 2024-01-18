import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'profile-view',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  template: `
<article>
  <nav aria-label="breadcrumb">
    <ul>
      <li><a routerLink="myBook">Mes livres</a></li>
      <li><a routerLink="info">Mes informations</a></li>
    </ul>
  </nav>
</article>
<router-outlet></router-outlet>

  `,
  styles: []
})
export class ProfileComponent {

}
