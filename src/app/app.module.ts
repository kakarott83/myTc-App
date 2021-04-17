import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
