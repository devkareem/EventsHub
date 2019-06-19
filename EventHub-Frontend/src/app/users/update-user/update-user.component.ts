import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { UsersServiceService } from '../../services/users-service.service'
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userId: string
  userForm: FormGroup;
  genders: String[] = [
    'male',
    'female'
  ];

  constructor(public formBuilder: FormBuilder, public us: UsersServiceService, private au: AuthService, public rt: Router, private toastr: ToastrService) {
    this.userForm = this.formBuilder.group({
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

    this.userId = this.au.currentUser ? this.au.currentUser._id : null;
    console.log(this.au.currentUser);
    if (this.userId) {
      this.us.getCurrentUserData(this.userId).subscribe((res: any) => {
        //console.log(res);
        if (res.status === 'OK') {
          // console.log(res);
          this.userForm.patchValue(res.data);
        }
      });
    }
  }

  ngOnInit() {

  }

  onSubmit() {
    let cfrm = confirm(`Are you sure you want to edit you account?`);
    if (cfrm) {
      // console.log(this.userForm.value);
      this.us.UpdateUser(this.userId, this.userForm.value).subscribe((res) => {
        this.toastr.success("User Data Updated", "Users");
      });
    }
  }

  deleteAccount() {
    let cfrm = confirm(`Are you sure you want to delete you account?
    All you data will be gone`);
    if (cfrm) {
      this.us.DeleteUser(this.userId).subscribe((res) => {
        this.toastr.success("User Deleted", "Users");
        this.au.logout();
        this.rt.navigateByUrl('/Home')
      });
    }
  }

  // validateNumber(value){
  //   console.log(!isNaN(value.key));
  //   if(!isNaN(value.key)){
  //     this.userForm.get('phone'). = true;
  //     //.setValue(this.userForm.get('phone').value.remove(value.key));
  //   }
  // }

}
