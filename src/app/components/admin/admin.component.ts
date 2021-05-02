import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/interfaces/country';
import { FireStoreService } from '../../services/fire-store-service.service';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  countryForm: FormGroup;
  myCountry: Country;
  exists = false;
  error: any;
  countryList: Observable<any[]>;
  existsCountry: Observable<any[]>;
  filteredCountry: Country[];
  private countryCollection: AngularFirestoreCollection<Country>;
  displayedColumns: string [] = ['id', 'name', 'rate', 'destRate'];
  dataSource;

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

  ngAfterViewInit() {
    this.countryList.forEach(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource, 'Data');
    });
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
      }
    });
  }

  selectCountry(element: Country) {
    this.myCountry = element;
    this.countryForm.setValue({
      name: element.name,
      rate: element.rate,
      destrate: element.destRate
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
}

