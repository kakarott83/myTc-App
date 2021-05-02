import { Component, OnInit } from '@angular/core';

import { FireStoreService } from 'src/app/services/fire-store-service.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor( public authService: FireStoreService ) { }

  member: any;

  ngOnInit(): void {

    this.getMember();

  }

  getMember() {
    this.authService.currUser()
      .then((result) => {
        this.member = result;
        console.log(this.member, 'currUser');
      });
  }

}
