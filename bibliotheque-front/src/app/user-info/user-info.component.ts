import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {UserDataService} from "../user-data.service";
import transformJavaScript from "@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer-worker";

@Component({
  selector: 'user-info-component',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  template: `

    <article *ngIf="userId !== -1">
      <h2>Modifier les informations</h2>
      <form>
        <label for="firstName">Prénom</label>
        <input type="text" id="firstName" name="firstName" placeholder="Prénom" [(ngModel)]="updateDto.firstName"
               required>
        <label for="lastName">Prénom</label>
        <input type="text" id="lastName" name="lastName" placeholder="Nom" [(ngModel)]="updateDto.lastName" required>
        <label for="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="adresse mail" [(ngModel)]="updateDto.email" required>

        <p id="errorMessage">{{ errorMessage }}</p>
        <button type="submit"
                (click)="updateInfo($event)">Submit
        </button>
      </form>
    </article>
    <article *ngIf="userId !== -1">
      <h2>Modifier le mot de passe</h2>
      <form>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="Mot de passe"
               [(ngModel)]="resetPassDto.password">

        <label for="passwordConfirm"
               *ngIf="!(this.confirmPassword === this.resetPassDto.password) || !isPasswordValid()">Confirmation du Mot
          de Passe
          <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Mot de passe"
                 aria-invalid="true" aria-describedby="invalid-helper" [(ngModel)]="confirmPassword">
        </label>
        <label for="passwordConfirmTrue"
               *ngIf="(this.confirmPassword === this.resetPassDto.password) && isPasswordValid()">Confirmation du Mot de
          Passe
          <input type="password" id="passwordConfirmTrue" name="passwordConfirmTrue" placeholder="Mot de passe"
                 aria-invalid="false" [(ngModel)]="confirmPassword">
        </label>
        <small id="invalid-helper" *ngIf="this.resetPassDto.password.length < 6">
          Le mot de passe doit être de plus de 6 caractères.
        </small>

        <p id="errorMessage">{{ errorMessagePassword }}</p>
        <button type="submit" *ngIf="(this.confirmPassword === this.resetPassDto.password) && isPasswordValid()"
                (click)="resetPassword($event)">Submit
        </button>
      </form>
    </article>

  `,
  styles: []
})
export class UserInfoComponent {
  protected errorMessage: string = "";
  protected errorMessagePassword: string = "";
  protected updateDto: {
    firstName: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
  } = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
  }

  protected resetPassDto: {
    password: string,
  } = {
    password: "",
  }
  protected confirmPassword = ""


  protected userId: number = -1

  constructor(private router: Router, private apiService: ApiService) {

  }

  ngDoCheck() {

  }

  ngOnInit() {
    this.apiService.validateToken().subscribe(
      response => {
        console.log(response)
        //@ts-ignore
        this.updateDto.email = response.email
        //@ts-ignore
        this.updateDto.lastName = response.lastName;
        //@ts-ignore
        this.updateDto.firstName = response.firstName;
        //@ts-ignore
        this.userId = response.id
        console.log(this.userId)
      },
      error => {
        this.router.navigateByUrl("")
      }
    )
  }
  isPasswordValid(): boolean {
    // Vérifier si le mot de passe a une longueur supérieure à 6 caractères
    const isLengthValid = this.resetPassDto.password.length >= 6;

    // Vérifier si la confirmation du mot de passe correspond au mot de passe
    const isConfirmationValid = this.confirmPassword === this.resetPassDto.password;

    // Retourner vrai si les deux conditions sont remplies
    return isLengthValid && isConfirmationValid;
  }

  updateInfo(event: Event) {
    this.errorMessage = ""
    console.log(this.updateDto)
    this.apiService.updateUser(this.userId, this.updateDto).subscribe(
      response => {
        alert("Utilisateur modifier")
        window.location.reload()
      },
      error => {
        this.errorMessage = error.message
      }
    )
  }
  resetPassword(event: Event) {
    this.errorMessagePassword = ""
    this.apiService.resetPassword(this.userId, this.resetPassDto).subscribe(
      response => {
        alert("Mot de passe modifié")
        window.location.reload()
      },
      error => {
        this.errorMessagePassword = error.message
      }
    )
  }
}
