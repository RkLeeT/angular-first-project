import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html' 
})

export class AuthModalComponent implements OnInit {

  modalCondition: boolean;

  @ViewChild(AuthComponent, { static: false}) authComponent: AuthComponent;

  constructor() {}

  setModalCond() {
    this.authComponent.modalCondition = true;
  }

  ngOnInit() {
    
  }

  
}
