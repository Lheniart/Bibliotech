import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {ApiService} from "../api.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'home-view',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private apiService: ApiService) {
  }
  protected userData : User | undefined
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
    this.apiService.validateToken().subscribe(response => {
      // @ts-ignore
      this.userData = response
    })
  }
}
interface User{
  id : number,
  email: string,
  firstName : string,
  lastName: string,
  roles : [],
}
