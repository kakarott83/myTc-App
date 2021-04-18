import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FireStoreServiceService } from '../../services/fire-store-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  error: any;

  constructor(
    public authService: FireStoreServiceService,
    private formbuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.logInForm = this.formbuilder.group({
      email: new FormControl('', [Validators.required]),
      pw: new FormControl('', [Validators.required])
    });
  }

  get SignUpformControls() {
    return this.logInForm.controls;
  }

  async onSubmit() {
     await this.authService.emailLogin(this.logInForm.value.email, this.logInForm.value.pw)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        this.error = err;
      });
  }

}
