import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _authService: AuthService) {}

  // canActivate():boolean {
  //   if(this._authService.loggedIn()) {
  //     return true
  //   } else {
  //     this.router.navigate(['/auth/login'])
  //     return false
  //   }
  // }

  async canActivate() {
    const response = await (await this._authService.verify()).toPromise()
    .then(res => {
      console.log(res)
      return true
    })
    .catch(err => {
      this.router.navigate(['/auth/login'])
      return false
    })
    return true
  }

  // async canActivate():Promise<boolean> {
  //   (await this._authService.verify()).toPromise()
  //   .then(res => {
  //     console.log(res)
  //     return true
  //   })
  //   .catch(err => {
  //     this.router.navigate(['/auth/login'])
  //     return false
  //   })
  //   return true
  // }
}
  

