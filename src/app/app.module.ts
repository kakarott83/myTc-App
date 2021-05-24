import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersComponent } from './auth/members/members.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { TravelListComponent } from './components/travel-list/travel-list.component';
import { TravelComponent } from './components/travel/travel.component';
import { CountryComponent } from './components/country/country.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';


export const firebaseConfig = {
    apiKey: 'AIzaSyDablJgvXY3YRq4RBR_99gwNJ01zcSIoRQ',
    authDomain: 'mytcapp-b107b.firebaseapp.com',
    projectId: 'mytcapp-b107b',
    storageBucket: 'mytcapp-b107b.appspot.com',
    messagingSenderId: '698925397066',
    appId: '1:698925397066:web:299b6398d1279a3dbe22b3'
};

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    TravelListComponent,
    TravelComponent,
    CountryComponent,
    CountryListComponent,
    CustomerComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
