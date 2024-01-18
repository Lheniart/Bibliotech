import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {RegisterComponent} from "./register/register.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {CreateBookComponent} from "./create-book/create-book.component";
import {UpdateBookComponent} from "./update-book/update-book.component";
import {ProfileComponent} from "./profile/profile.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {MyBookComponent} from "./my-book/my-book.component";
import {BookAllPageComponent} from "./book-all-page/book-all-page.component";

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
      },
      {
        path: "book/:id",
        component: BookAllPageComponent
      },
      {
        path: "profile",
        component: ProfileComponent,
        children: [
          {
            path:"info",
            component: UserInfoComponent
          },
          {
            path: "myBook",
            component: MyBookComponent
          }
        ]
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
