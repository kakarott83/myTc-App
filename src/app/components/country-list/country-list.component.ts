import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Country } from 'src/app/interfaces/country';
import { FireStoreService } from '../../services/fire-store-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit, AfterViewInit {

  countryList: Observable<any[]>;
  existsCountry: Observable<any[]>;
  filteredCountry: Country[];
  myCountry: Country;
  exists = false;
  private countryCollection: AngularFirestoreCollection<Country>;
  displayedColumns: string [] = ['id', 'name', 'rate', 'destRate'];
  dataSource;

  @Output() selectedRowFromList = new EventEmitter();
  mySelectedCountry: Country;

  constructor(
    public fsservice: FireStoreService
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  ngAfterViewInit() {
    this.countryList.forEach(data => {
      this.dataSource = new MatTableDataSource(data);
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

  selectCountry(selectedCountry) {
    console.log(selectedCountry, 'output');
    this.mySelectedCountry = selectedCountry;
    this.selectedRowFromList.emit('hallo');
  }
}
