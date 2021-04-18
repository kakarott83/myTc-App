import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FireStoreServiceService } from 'src/app/services/fire-store-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  error: any;
  response: any;

  constructor(
    public authService: FireStoreServiceService,
    private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      pw: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPw: new FormControl('', [Validators.required])
    });
  }

  get SignUpformControls() {
    return this.signUpForm.controls;
  }

  async onSubmit() {
    await this.authService.signUp(this.signUpForm.value)
      .then((resp) => {
        console.log(resp);
        this.authService.sendVerifactionMail();
        this.response = resp;
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      });
  }

}
