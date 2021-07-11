import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, appRouteComponents } from './app-routing.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { ModalComponent } from './modal/modal.component';

import { AppInterceptorService } from './app-interceptor.service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProjectService } from './project/project.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth.guard';
import { GlobalService } from './global.service';

@NgModule({
  declarations: [
    AppComponent,
    appRouteComponents,
    TestComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppBootstrapModule,
    ProjectModule,
    AuthModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    },
    ProjectService,
    AuthService,
    AuthGuard,
    GlobalService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
})
export class AppModule { }
