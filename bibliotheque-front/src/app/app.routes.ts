import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {RegisterComponent} from "./register/register.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {CreateBookComponent} from "./create-book/create-book.component";
import {UpdateBookComponent} from "./update-book/update-book.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children : [
      {
        path: "",
        component : AccueilComponent
      },
      {
        path: "createBook",
        component: CreateBookComponent
      },
      {
        path: "updateBook/:id",
        component : UpdateBookComponent
      }
    ]
  },
  {
    path: "signIn",
    component: SignInComponent
  },
  {
    path:"register",
    component:RegisterComponent
  }
];
