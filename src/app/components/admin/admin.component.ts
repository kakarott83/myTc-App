import { Component, OnInit } from '@angular/core';
import { validateEventsArray } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  countryForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.countryForm = this.formbuilder.group({
      name: new FormControl('',  [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      destRate: new FormControl('', [Validators.required])
    });
  }

}
