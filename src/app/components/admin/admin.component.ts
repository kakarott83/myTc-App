import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/interfaces/country';
import { FireStoreService } from '../../services/fire-store-service.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorcountryComponent } from 'src/app/snackbar/errorcountry/errorcountry.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  countryForm: FormGroup;
  myCountry: Country;
  checkName: '';
  exists = false;
  error: any;
  countryList: Observable<any[]>;
  existsCountry: Observable<any[]>;
  filteredCountry: Country[];
  private countryCollection: AngularFirestoreCollection<Country>;
  durationSnackbar = 5;

  constructor(
    private formbuilder: FormBuilder,
    private snackBar: MatSnackBar,
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
    this.myCountry = {
      name: this.countryForm.get('name').value,
      rate: this.countryForm.get('rate').value,
      destRate: this.countryForm.get('destRate').value,
    };

    this.fsservice.getCountryByName(this.myCountry.name).forEach(resp => {
      if (resp.docs.length === 0 ) {
        this.exists = false;
        this.fsservice.createCountry(this.myCountry);
      } else {
        this.exists = true;
        this.checkCountry();
      }
    });
  }

  getCountries() {
    this.countryList = this.fsservice.getCountries();
  }

  getCountryByName(name) {
    this.fsservice.getCountryByName(name).forEach(resp => {
      if (resp.docs.length === 0 ) {
        this.exists = false;
        this.fsservice.createCountry(this.myCountry);
      } else {
        this.exists = true;
      }
    });
  }

  checkCountry() {
    this.snackBar.openFromComponent(ErrorcountryComponent, {
      duration: this.durationSnackbar
    });
  }
}

