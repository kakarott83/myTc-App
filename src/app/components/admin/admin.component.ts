import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/interfaces/country';
import { FireStoreService } from '../../services/fire-store-service.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  countryForm: FormGroup;
  myCountry: Country;
  error: any;
  countryList: Observable<Country[]>;
  private countryCollection: AngularFirestoreCollection<Country>;

  constructor(
    private formbuilder: FormBuilder,
    public fsservice: FireStoreService
  ) { }

  ngOnInit(): void {
    this.countryForm = this.formbuilder.group({
      name: new FormControl('',  [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      destRate: new FormControl('', [Validators.required])
    });

    this.getCountries();
  }

  onSubmit() {
    console.log(this.myCountry, 'First');
    this.myCountry = {
      name: this.countryForm.get('name').value,
      rate: this.countryForm.get('rate').value,
      destRate: this.countryForm.get('destRate').value,
    };
    this.fsservice.createCountry(this.myCountry);
  }

  getCountries() {
    this.fsservice.getCountries();
  }

}
