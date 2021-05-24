import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FireStoreService } from '../../services/fire-store-service.service';
import { Country } from 'src/app/interfaces/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnChanges {

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
      name: new FormControl(this.selectedCountry.name,  [Validators.required]),
      rate: new FormControl(this.selectedCountry.rate, [Validators.required]),
      destRate: new FormControl(this.selectedCountry.destRate, [Validators.required])
    });
  }

  ngOnChanges() {
    console.log('change');
    if (this.countryForm) {
      this.countryForm.setValue({
      name: this.selectedCountry.name,
      rate: this.selectedCountry.rate,
      destRate: this.selectedCountry.destRate
    });
    }
  }

  get name(): any {
    return this.countryForm.get('name');
  }

  get rate(): any {
    return this.countryForm.get('rate');
  }

  get destRate(): any {
    return this.countryForm.get('destRate');
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
