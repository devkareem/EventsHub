import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

import { UsersServiceService } from '../Services/users-service.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  genders:String[] = [
    'Male',
    'Female'
  ];

  constructor(private formBuilder: FormBuilder, public ru: UsersServiceService) {
    this.userForm = formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'passwordGroup': formBuilder.group({
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
      'address': formBuilder.group({
        'state': ['', []],
        'city': ['', []],
        'street': ['', []],
        'zipCode': ['', []]
      })
    });

    this.userForm.valueChanges.subscribe(
      (data: any) => {
        //console.log(data);
      }
    );
  }

  onSubmit() {
    this.userForm.value.password = this.userForm.value.passwordGroup.password;
    console.log(this.userForm.value);
    this.ru.registerNewUser(this.userForm.value);
  }

  ngOnInit() {
  }

  confirmPasswordValidator(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
