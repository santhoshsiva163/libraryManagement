import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitStatus = false;
  username: any;
  password: any;
  LibraryUserDetails: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userservice: UserService,
    private bookservice: BookService
  ) { }

  ngOnInit() {

    this.getAllUserDetails();
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
    if (localStorage.getItem('User') !== null) {
      this.route.navigate(['/WelcomeUser']);
    }

  }

  get loginFormObj() {
    return this.loginForm.controls;
  }

  submitLoginForm() {
    this.submitStatus = true;
    const data = this.LibraryUserDetails.find(x => x.addPassword === this.loginForm.value.password &&
      x.addUserName === this.loginForm.value.username);
      console.log(data);
    if (data) {
      localStorage.setItem('User', data.key);
      localStorage.setItem('UserType', data.userType);
      this.userservice.loginStatus = true;
      
      if (localStorage.getItem('UserType') === 'Admin') {
        this.userservice.IsAdmin = true;
      } else {
        this.userservice.IsAdmin = false;
      }
      console.log(this.userservice.IsAdmin);
      this.route.navigate(['/WelcomeUser']);
    }

    console.log(this.submitStatus);
    console.log(this.LibraryUserDetails);
  }

  getAllUserDetails() {
    this.userservice.getAllUserDetails().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(LibraryUserDetails => {
      this.LibraryUserDetails = LibraryUserDetails;
    });
  }

}
