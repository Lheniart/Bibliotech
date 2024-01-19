import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'update-user-component',
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

  `,
  styles: []
})
export class UpdateUserComponent {

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

  protected userId: number = -1

  constructor(private route: ActivatedRoute,private router: Router, private apiService: ApiService) {

  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
    });
    this.apiService.validateToken().subscribe(
      response => {




      },
      error => {
        this.router.navigateByUrl("")
      }
    )
    this.apiService.getUserById(this.userId).subscribe(
      response =>{
        //@ts-ignore
        this.updateDto.email = response.email
        //@ts-ignore
        this.updateDto.lastName = response.lastName;
        //@ts-ignore
        this.updateDto.firstName = response.firstName;
      }
    )

  }


  updateInfo(event: Event) {
    this.errorMessage = ""
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


}
