import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { UsersServiceService } from '../../Services/users-service.service'
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userId : string
  userForm: FormGroup;
  genders: String[] = [
    'male',
    'female'
  ];

  constructor(public formBuilder: FormBuilder, public us: UsersServiceService, private au: AuthService, public rt : Router) {
    this.userForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
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

    this.userId = this.au.currentUser ? this.au.currentUser._id : null;
    if (this.userId) {
      this.us.getCurrentUserData(this.userId).subscribe((res: any) => {
        console.log(res);
        if (res.status === 'OK') {
          console.log(res);
          this.userForm.patchValue(res.data);
        }
      });
    }
  }

  ngOnInit() {
    
  }

  onSubmit() {
    //this.userForm.value.password = this.userForm.value.passwordGroup.password;
    console.log(this.userForm.value);
    this.us.UpdateUser(this.userId,this.userForm.value);
  }

  deleteAccount() {
    // (
    //   <FormArray>this.myForm.controls['hobbies']).push(new FormControl('', Validators.required, this.asyncExampleValidator)
    // );
    this.us.DeleteUser(this.userId).subscribe((res) => {
      this.au.logout();
      this.rt.navigateByUrl('/Home')
      //console.log(res);
    });

    

  }

}
