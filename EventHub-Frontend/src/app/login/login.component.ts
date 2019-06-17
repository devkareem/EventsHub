import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private toastr: ToastrService) {
    this.myForm = formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]
      ],
      'password': ['', Validators.required]
    });



  }

  ngOnInit() {
  }

  async onSubmit() {
    const result = await this.authService.login(this.myForm.value);
    if(result.status){
      this.toastr.success("Login success","Authentication");
      this.router.navigate(['/']);
    }else{
      this.toastr.error(result.message,"Authentication");
    }
  }

}
