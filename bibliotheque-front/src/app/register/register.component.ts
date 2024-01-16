import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'register-view',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {
  }

  navigateBack(event :Event){
    event.preventDefault()
    this.router.navigateByUrl("")
  }

}
