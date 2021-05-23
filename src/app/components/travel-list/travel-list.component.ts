import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Country } from 'src/app/interfaces/country';
import { FireStoreService } from '../../services/fire-store-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit, AfterViewInit {

  countryList: Observable<any[]>;
  existsCountry: Observable<any[]>;
  filteredCountry: Country[];
  myCountry: Country;
  exists = false;
  private countryCollection: AngularFirestoreCollection<Country>;
  displayedColumns: string [] = ['id', 'name', 'rate', 'destRate'];
  dataSource;


  constructor(
    public fsservice: FireStoreService
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  ngAfterViewInit() {
    this.countryList.forEach(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource, 'Data');
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
