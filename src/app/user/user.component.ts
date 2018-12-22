import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  adduserformSubmitStatus = false;
  addUserform: FormGroup;
  checkUsers = ['Admin', 'reader'];

  constructor(
    private userservice: UserService
  ) { }

  ngOnInit() {
    // this.addUserform = this.formbuilder.group({
    //   addUserName: ['', Validators.required],
    //   addPassword: ['', Validators.required, Validators.minLength(4)]
    // });
    this.addUserform = new FormGroup({
      key: new FormControl(null),
      addUserName: new FormControl('', [Validators.required]),
      addPassword: new FormControl('', [Validators.required]),
      userType: new FormControl(this.checkUsers[1], [Validators.required]),
      userImage: new FormControl('', [Validators.required]),
      userBookLimit: new FormControl('', [Validators.required])
    });
  }

  get addUserformObj() {
    return this.addUserform.controls;
  }

  async addUserSubmitform() {
    this.adduserformSubmitStatus = true;
    const addUserFormValue = this.addUserform.value;
    console.log(this.addUserform.valid);
    console.log(addUserFormValue);
    if (this.addUserform.valid === true) {
      try {
        await this.userservice.createUserDetail(addUserFormValue);
          // this.success = true;
          this.addUserform.reset();
          this.userservice.userDetailData.next(null);
          // this.route.navigate(['/Dashboard']);
          this.adduserformSubmitStatus = false;
  
      } catch (err) {
        console.error(err);
      }
    } else {

    }
    
    
  }

  adduserCancel() {
    this.addUserform.reset();
  }

}
