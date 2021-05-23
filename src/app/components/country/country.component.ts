import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FireStoreService } from '../../services/fire-store-service.service';
import { Country } from 'src/app/interfaces/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  countryForm: FormGroup;
  exists = false;

  @Input() selectedCountry: Country;

  constructor(
    private formbuilder: FormBuilder,
    public fsservice: FireStoreService
  ) { }

  ngOnInit(): void {

    if (!this.selectedCountry) {
      this.selectedCountry = {
        name: '',
        rate: 0,
        destRate: 0
      };
    }

    this.countryForm = this.formbuilder.group({
      name: new FormControl('',  [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      destRate: new FormControl('', [Validators.required])
    });
  }

  onChanges() {

  }

  onSubmit() {
    /*
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
    */
  }
}