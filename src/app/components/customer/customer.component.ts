import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/interfaces/customer';
import { Country } from 'src/app/interfaces/country';
import { CountryComponent } from '../country/country.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  countries: Country[];

  @Input() selectedCustomer: Customer;

  constructor(
    private formbuilder: FormBuilder
  ) {  }

  ngOnInit(): void {

    if (!this.selectedCustomer) {
      this.selectedCustomer = {
        name: '',
        ort: '',
        land: {name: '', rate: 0, destRate: 0}
      };
    }

    this.customerForm = this.formbuilder.group({
      name: new FormControl(this.selectedCustomer.name, [Validators.required]),
      ort: new FormControl(this.selectedCustomer.ort, [Validators.required]),
      country: new FormControl(this.selectedCustomer.land, [Validators.required])
    });
  }

  onSumbit() {
    console.log('onSubmit');
  }
}
