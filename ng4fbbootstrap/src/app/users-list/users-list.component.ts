import { Component, OnInit } from '@angular/core';
import {DemoService} from './demo.service';
import {observable} from 'rxjs';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: []
})
export class UsersListComponent implements OnInit {
  public users;
  constructor(private _demoService: DemoService) { }

  ngOnInit() {
  	this.getUsers();
  }

  getUsers() {
  	this._demoService.getUsers().subscribe(
  		data => {this.users = data['users']},
  		err => console.error(err),
  		() => console.log('Done loading users')
  	);
  }

}
