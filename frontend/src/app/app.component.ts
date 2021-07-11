import { Component, ViewChild } from '@angular/core';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthService } from './auth/auth.service';
import { AuthModalComponent } from './auth/auth-modal/auth-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-project';
  
  modalCondition: boolean;

  // @ViewChild(AuthComponent, { static: false}) authComponent: AuthComponent;
  @ViewChild(AuthModalComponent, { static: false}) authDialog: AuthModalComponent;

  constructor(private authService: AuthService) {}

  setModalCond() {
    // this.authComponent.modalCondition = true;
    this.authDialog.setModalCond();
  }


}
