import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator, PasswordValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  registrationForm: FormGroup;
  errorMsg: string;
  successMsg: string;

  @Input() modalCondition: boolean;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) { }

  get userNameL() {
    return this.loginForm.get('username');
  }

  get userNameR() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  changeCond() {
    this.modalCondition = !this.modalCondition;
  }

  submitLogin() {
    let user = this.loginForm.value
    console.log(user)

    this._authService.loginUser(user)
      .subscribe(
        res => { 
          console.log(res)
          this.successMsg = res
          localStorage.setItem('token', res.token)
          localStorage.setItem('username', user.username)
          this.router.navigate(['/project'])
        },
        err => {
          console.log(err)
          this.errorMsg = err
        })

    this.loginForm.reset();
  }

  submitRegistration() {
    let user = this.registrationForm.value
    console.log(user)

    this._authService.registerUser(user)
      .subscribe(
        res => {
          console.log(res)
          this.successMsg = res.message
          // this.changeCond()
        },
        err => {
          console.log(err)
          this.errorMsg = err
        }
      );

  }

  ngOnInit() {
    // this._authService.loggedUser = null;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), forbiddenNameValidator(/admin/)]],
      password: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: PasswordValidator });
  }

}
