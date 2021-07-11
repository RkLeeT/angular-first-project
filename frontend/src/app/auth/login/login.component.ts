import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) { }

  get userNameL() {
    return this.loginForm.get('username');
  }

  submitLogin() {
    let user = this.loginForm.value
    console.log(user)

    this._authService.loginUser(user)
      .subscribe(
        res => { 
          console.log(res)
          localStorage.setItem('username', user.username)
          localStorage.setItem('token', res.token)
          this.router.navigate(['/project'])
        },
        err => {
          console.log(err)
          this.errorMsg = err
        }
      )

    this.loginForm.reset();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

}
