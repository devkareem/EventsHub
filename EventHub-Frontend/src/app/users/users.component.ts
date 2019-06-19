import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

import { UsersServiceService } from '../services/users-service.service'
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordMatcher } from './matcher'
import { Router } from '@angular/router'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  genders: String[] = [
    'male',
    'female'
  ];

  public userData;
  public matcher = new PasswordMatcher();

  constructor(public formBuilder: FormBuilder, public us: UsersServiceService, private au: AuthService, public rt: Router,private toastr: ToastrService) {
    this.userForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
      ]],
      'passwordGroup': this.formBuilder.group({
        'password': ['', [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{6,}')
        ]],
        'confirmPassword': ['', [Validators.required]]
      }, {validator: this.confirmPasswordValidator }
      ),
      'name': ['', Validators.required],
      'phone': ['',[Validators.maxLength(10),Validators.minLength(10)]],
      'gender': [''],
      'address': this.formBuilder.group({
        'state': ['', []],
        'city': ['', []],
        'street': ['', []],
        'zipCode': ['', []]
      })
    });


  }

  onSubmit() {
    this.userForm.value.password = this.userForm.value.passwordGroup.password;
    console.log(this.userForm.value);

    this.us.registerNewUser(this.userForm.value).subscribe((res) => {
      this.toastr.success("User Created", "Users");
      this.rt.navigateByUrl('/Home')
      //console.log(res);
    });

  }

  ngOnInit() {

  }

  confirmPasswordValidator(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
