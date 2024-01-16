import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../api.service";
import {catchError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'sign-in-view',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private router: Router, private apiService: ApiService) {
  }
  protected errorMessage : string = "";

  protected signInDto: { email: string, password: string } = {
    email: "",
    password: ""
  }

  navigateBack(event: Event) {
    event.preventDefault()
    this.router.navigateByUrl("")
  }

  signIn(event: Event) {
    this.errorMessage = ""
    event.preventDefault();
    this.apiService.signIn(this.signInDto).subscribe(response => {
        let data: AuthResponse;
        // @ts-ignore
        data = response;
        localStorage.setItem('token', data.accessToken);
        this.router.navigateByUrl("")
      },
      (err) => {
        this.errorMessage = err.message;
      })
  }

}

interface AuthResponse {
  accessToken: string,
  tokenType: string
}
