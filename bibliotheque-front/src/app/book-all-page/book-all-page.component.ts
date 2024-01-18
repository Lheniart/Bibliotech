import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {UserDataService} from "../user-data.service";
import {Book, Page, updatePageDto, User} from "../Models/models";
import {PageTemplateComponent} from "../page-template/page-template.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'book-all-page-vue',
  standalone: true,
  imports: [
    PageTemplateComponent,
    NgIf
  ],
  template: `
    <article class="grid" style="text-align: center">
      <button class="secondary" style="max-width: 300px" *ngIf="true" (click)="addNewPage($event)">Créer une nouvelle page
      </button>
    </article>
    <article>
      <h2 style="text-align: center">{{ book.title }}</h2>
      <page-template-component [page]="listPage![currentPage]" [book]="book"></page-template-component>
      <div id="nav-page">
        <a (click)="pageDown($event)"><</a>
        <p>{{ currentPage+1 }}/{{ listPage?.length }}</p>
        <a (click)="pageUp($event)">></a>
      </div>
    </article>
    <style>
      a {
        font-size: 30px;
      }

      #nav-page {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-evenly;
      }
    </style>
  `,
  styles: []
})
export class BookAllPageComponent {
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private userDataService: UserDataService) {
  }


  protected id: number = -1
  protected currentPage: number = 0
  protected listPage : Page[] | undefined
  protected book! : Book
  protected userData!: User

  ngOnInit() {
    this.apiService.validateToken().subscribe(
      r =>{
        //@ts-ignore
        this.userData = r
      },
      error => {
        this.router.navigateByUrl("")
      }
    )
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.apiService.getBookById(this.id).subscribe(
        r =>{
          //@ts-ignore
          this.book = r
        }
      )
      this.apiService.getPageByBookId(this.id).subscribe(
        r=>{
          //@ts-ignore
          this.listPage = r
          this.listPage?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

          console.log(this.listPage);
          // @ts-ignore
          console.log(this.listPage[0])
        }
      )
    });
  }
  pageUp(event :Event){
    event.preventDefault()
    // @ts-ignore
    if (this.currentPage +1 <this.listPage?.length){
      this.currentPage++
    }

  }
  pageDown(event :Event){
    event.preventDefault()
    // @ts-ignore
    if (this.currentPage  > 0){
      this.currentPage--
    }

  }
  updateBookDto: updatePageDto = {
    title: "",
    content: "",
    book : -1
  }
  addNewPage(event: Event) {
    event.preventDefault();
    this.updateBookDto.title = "Nouvelle page";
    this.updateBookDto.content = "";
    if (this.book.id != null) {
      this.updateBookDto.book = this.book.id
    }
    console.log(this.updateBookDto)
    this.apiService.addNewPage(this.updateBookDto).subscribe(
      response =>{
        console.log(response);
        alert("Nouvelle page ajoutée")
        window.location.reload()
      }
    )
  }

  calculateCondition() {
    return (this.userData.roles.some(role => role.name === "ADMIN") || this.book.users.some(user => user.id === this.userData.id))
  }
}
