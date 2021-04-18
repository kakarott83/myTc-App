import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
// import auth from 'firebase/firebase-auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// const auth = firebase.auth();

@Injectable({
  providedIn: 'root'
})
export class FireStoreServiceService {

  authState: any = null;
  userData: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router
  )
  { this.userData = afAuth.authState; }

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
}


