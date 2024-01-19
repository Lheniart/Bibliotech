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
import {AdminVueComponent} from "./admin-vue/admin-vue.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {UserGestionComponent} from "./user-gestion/user-gestion.component";
import {UpdateUserComponent} from "./update-user/update-user.component";

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
          },
          {
            path: "admin",
            component: AdminVueComponent,
            children: [
              {
                path: "categories",
                component: CategoryListComponent
              },
              {
                path : "users",
                component: UserGestionComponent
              },
              {
                path: "user/:id",
                component: UpdateUserComponent
              }
            ]
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
