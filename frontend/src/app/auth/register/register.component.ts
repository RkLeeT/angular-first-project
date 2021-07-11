import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator, PasswordValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  errorMsg: string;
  successMsg: string;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) { }

  get userNameR() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  submitRegistration() {
    let user = this.registrationForm.value
    console.log(user)

    this._authService.registerUser(user)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/auth/login'])
          this.successMsg = res
        },
        err => {
          console.log(err)
          this.errorMsg = err
        }
      );

  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), forbiddenNameValidator(/admin/)]],
      password: ['', Validators.minLength(6)],
      confirmPassword: ['']
    }, {validator: PasswordValidator});
  }

}
