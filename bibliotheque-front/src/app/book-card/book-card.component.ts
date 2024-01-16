import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Book} from "../Models/models";

@Component({
  selector: 'book-card-component',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template : `
    <article>
      <img src="{{book.image}}">
      <h3>{{ book.title }}</h3>
      <details>
        <summary>plus de details</summary>
        <p> {{ book.resume }}</p>
      </details>

    </article>
    <style>
      article {
        text-align: center;
        width: 400px;
      }
    </style>


  `,
  styles:[]
})
export class BookCardComponent {
  @Input("value")
  book!: Book
}

