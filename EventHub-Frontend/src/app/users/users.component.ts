import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

import { UsersServiceService } from '../Services/users-service.service'
import { AuthService } from '../auth.service';

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
  public isUpdate = false;

  constructor(public formBuilder: FormBuilder, public us: UsersServiceService, private au: AuthService) {
    this.userForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'passwordGroup': this.formBuilder.group({
        'password': ['', [
          Validators.required//,
          //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]],
        'confirmPassword': ['', [Validators.required]]
        //}, { validator: this.confirmPasswordValidator }),
      }),
      'name': ['', Validators.required],
      'phone': [''],
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
    this.us.registerNewUser(this.userForm.value);
  }

  ngOnInit() {

  }

  confirmPasswordValidator(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
