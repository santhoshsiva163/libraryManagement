import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISBNBookDetails } from '../../models/isbnBookDetails';
import { Book } from '../../models/bookDetails';

@Component({
  selector: 'app-addbookusing-isbn',
  templateUrl: './addbookusing-isbn.component.html',
  styleUrls: ['./addbookusing-isbn.component.css']
})
export class AddbookusingIsbnComponent implements OnInit {

  addisbnBookFormStatus = false;
  addISBNBookForm: FormGroup;
  showSpinner = true;

  constructor(
    private bookService: BookService,
    private route: Router,
  ) { }

  isbnBookrecord: any = ISBNBookDetails;
  addToBookData: any = Book;
  displayData = false;
  noRecordDetail = false;
  noRecordFoundTxt = '';
  bookCount: number;

  ngOnInit() {

    this.bookService.overallBookCount.subscribe((count) => { this.bookCount = count + 1; console.log(this.bookCount); });
    this.addISBNBookForm = new FormGroup({
      isbnCode: new FormControl('', Validators.required, Validators.minLength[13])
    });

  }

  get addISBNBookObj() {
    return this.addISBNBookForm.value;
  }

  addIsbnformSubmit() {
    const getISBNFormValue = this.addISBNBookForm.value.isbnCode;
    if (getISBNFormValue !== '') {
      this.getContentJSON(getISBNFormValue);
    } else {
      alert('Please provide the ISBN number');
    }
  }

  getContentJSON(getISBNFormValue) {
    this.showSpinner = false;
    const isbnFormValue = getISBNFormValue;
    this.bookService.getISBNBookDetails(isbnFormValue).subscribe(data => {
      this.isbnBookrecord = data;
      console.log(this.isbnBookrecord);
      console.log(data.totalItems);
      this.addISBNBookForm.reset();

      if (data.totalItems > 0) {
        this.displayData = true;
        const receivedBookKey = null;
        const receivedBookTitle = this.isbnBookrecord.items[0]['volumeInfo']['title'];
        const receivedBookId = this.bookCount;
        const receivedBookAuthor = this.isbnBookrecord.items[0]['volumeInfo']['authors'][0];
        const receivedBookCategory = this.isbnBookrecord.items[0]['volumeInfo']['categories'];
        const receivedBookImageURL = this.isbnBookrecord.items[0]['volumeInfo']['imageLinks']['thumbnail'];
        const receivedBookNumber = isbnFormValue;
        const receivedBookDesc = this.isbnBookrecord.items[0]['volumeInfo']['description'];
        const receivedBookStock = 5;
        const receivedBookAvailbility = 15;
        const receivedBookLocation = 'A1';
        this.noRecordDetail = false;
        if (this.noRecordDetail === false) {
          this.noRecordFoundTxt = '';
        }
        this.addToBookData = new Book(receivedBookKey, receivedBookTitle, receivedBookId, receivedBookAuthor, receivedBookCategory, receivedBookImageURL, receivedBookNumber, receivedBookDesc, receivedBookStock, receivedBookAvailbility, receivedBookLocation);
        this.showSpinner = true;
      } else {
        this.addToBookData = null;
        this.displayData = false;
        this.noRecordDetail = true;
        this.showSpinner = true;
        if (this.noRecordDetail === true) {
          this.noRecordFoundTxt = 'No Records Found';
        }
      }

    },
      err => {
        console.log('error: ', err);
      });
  }

  onAdd() {
    this.bookService.createBookDetail(this.addToBookData);
    this.addToBookData = null;
    this.displayData = false;
    this.route.navigate(['/Dashboard']);
  }

}

