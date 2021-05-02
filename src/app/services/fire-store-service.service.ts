import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';
import { map } from 'rxjs/operators';

// const auth = firebase.auth();

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  authState: any = null;
  userData: Observable<firebase.User>;
  private countries: Observable<Country[]>;
  private countryCollection: AngularFirestoreCollection<Country>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router,
  )
  {
    this.userData = afAuth.authState;
    this.countryCollection = afs.collection('country');
   }

  /******* Methoden **********/
  async anonymousLogin() {
    return await this.afAuth.signInAnonymously()
      .then((result) => {
        console.log(result.user.uid, 'anonymousLogin');
        this.router.navigate(['/members']);
      });
  }

  async googleLogin() {
    return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log(result.user.displayName, 'googleLogin');
        this.router.navigate(['/members']);
      });
  }

  emailLogin(email, pw) {
    return this.afAuth.signInWithEmailAndPassword(email, pw);
  }

  logout() {
    return this.afAuth.signOut()
      .then((result) => {
        console.log(result, 'logout');
        this.router.navigate(['/login']);
      });
  }

  async currUser() {
    return await firebase.auth().currentUser;
  }

  signUp(user: any) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.pw);
  }

  async sendVerifactionMail() {
    (await this.afAuth.currentUser).sendEmailVerification();
  }

  createCountry(country: Country) {
    return this.afs.collection('country').add(country);
  }

  getCountries() {
    return this.countries = this.countryCollection.snapshotChanges()
    .pipe( map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Country;
      const id = a.payload.doc.id;
      console.log(data, 'service');
      return { id, ...data};
      }))
    );
  }



  getCountryByName(name: string) {
    return this.countries = this.countryCollection.snapshotChanges()
      .pipe( map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Country;
        const id = a.payload.doc.id;
        console.log(data, 'service');
        return { id, ...data};
      }))
    );
  }


}


