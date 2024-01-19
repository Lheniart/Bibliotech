import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../api.service";

@Component({
  selector: 'register-view',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  protected errorMessage : string = "";
  protected registerDto: { firstName: string | undefined, lastName: string | undefined ,email: string | undefined, password: string } = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: ""
  }

  protected confirmPassword = ""
  constructor(private router: Router, private apiService: ApiService) {
  }


  navigateBack(event :Event){
    event.preventDefault()
    this.router.navigateByUrl("")
  }
  isPasswordValid(): boolean {
    // Vérifier si le mot de passe a une longueur supérieure à 6 caractères
    const isLengthValid = this.registerDto.password.length >= 6;

    // Vérifier si la confirmation du mot de passe correspond au mot de passe
    const isConfirmationValid = this.confirmPassword === this.registerDto.password;

    // Retourner vrai si les deux conditions sont remplies
    return isLengthValid && isConfirmationValid;
  }

  register(event : Event){
    this.errorMessage = ""
    this.apiService.register(this.registerDto).subscribe(
      response =>{
        alert("Inscription réussite")
        this.router.navigateByUrl("")
      },
      error => {
        this.errorMessage = error.message
      }
    )
  }

}
