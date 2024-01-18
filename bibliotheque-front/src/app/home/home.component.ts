import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {ApiService} from "../api.service";
import {NgIf} from "@angular/common";
import {UserDataService} from "../user-data.service";
import {User} from "../Models/models";

@Component({
  selector: 'home-view',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private apiService: ApiService, private userDataService: UserDataService) {
  }
  protected userData! : User
  navigateToSignIn(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("/signIn");
  }
  navigateToRegister(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("/register");
  }
  logOut(event:Event){
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.reload()
  }
  ngOnInit() {
    this.apiService.validateToken().subscribe(response  => {
      this.userData = <User>response
      this.userDataService.setUserData(this.userData);
    })
  }
}

