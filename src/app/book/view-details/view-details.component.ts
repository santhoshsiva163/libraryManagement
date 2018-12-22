import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/bookdetails';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  constructor(
    private bookService: BookService, private router: Router, private userservice: UserService
  ) { }

  bookdata: Book;
  bookCount: number;

  ngOnInit() {
    this.bookService.bookdata.subscribe( (result) => { this.bookdata = result; });
    this.bookService.overallBookCount.subscribe( (count) => { this.bookCount = count; console.log(this.bookCount); });
  }

  deleteCurrentBookDetail(bookdata) {
    console.log(bookdata);
    if (confirm('Are you sure do you want to delete this Book details? ')) {
      this.bookService.deleteBookDetail(bookdata.key);
      this.bookService.clickedBookObj.subscribe(data => {
        this.bookdata = data;
        // this.bookService.bookdata.next(null);
      });
    }

  }


  updateCurrentBookDetail(clickedBookData) {
    this.bookService.bookdata.next(clickedBookData);
    this.bookService.isedit = true;
    this.router.navigate(['/AddBook']);
  }

}



