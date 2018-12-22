import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {

  addBookForm: FormGroup;
  addBkSubmitStatus = false;
  success = false;
  isEdit = false;
  data: any;
  pageTitle = 'Add Book';
  bookCount = 0;


  constructor(
    private bookService: BookService,
    private route: Router
  ) { }

  ngOnInit() {

    this.bookService.overallBookCount.subscribe((count) => { this.bookCount = count + 1; console.log(this.bookCount); });
    this.addBookForm = new FormGroup({
      key: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      id: new FormControl(this.bookCount, [Validators.required]),
      author: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      imageURL: new FormControl('', Validators.required),
      isbnBook: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      availableDays: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });

    

    this.isEdit = this.bookService.isedit;
    if (this.isEdit) {
      this.data = this.bookService.bookdata.subscribe((result) => {
        if (result) {
          this.pageTitle = 'Edit Book';
          this.isEdit = true;
          console.log(result);
          this.addBookForm.setValue({
            key: result.key,
            title: result.title,
            id: result.id,
            author: result.author,
            category: result.category,
            imageURL: result.imageURL,
            isbnBook: result.isbnBook,
            desc: result.desc,
            stock: result.stock,
            availableDays: result.availableDays,
            location: result.location
          });
        }

      });
    }




  }

  get addBookFormObj() {
    return this.addBookForm.controls;
  }

  async addBookDetails() {
    this.addBkSubmitStatus = true;

    const formValue = this.addBookForm.value;
    console.log(this.addBookForm.valid);
    if (this.addBookForm.valid) {
      if (this.isEdit) {
        try {
          await this.bookService.editBookDetail(formValue.key, formValue);
          this.success = true;
          this.addBookForm.reset();
          this.data.unsubscribe();
          this.bookService.bookdata.next(null);
          this.route.navigate(['/Dashboard']);
          this.addBkSubmitStatus = false;
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          await this.bookService.createBookDetail(formValue);
          this.success = true;
          this.bookService.isedit = false;
          this.addBookForm.reset();
          this.bookService.bookdata.next(null);
          this.route.navigate(['/Dashboard']);
          this.addBkSubmitStatus = false;
        } catch (err) {
          console.error(err);
        }
      }
    }


  }

  resetform() {
    this.addBookForm.reset(); // Added this
    this.bookService.isedit = false;
  }

}
