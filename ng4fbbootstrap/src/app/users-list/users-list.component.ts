import { Component, OnInit } from '@angular/core';
import {DemoService} from './demo.service';
import {observable} from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import {User} from '../user';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: []
})
export class UsersListComponent implements OnInit {

	public users;
	registerForm: FormGroup;

	constructor(private _demoService: DemoService, private formBuilder: FormBuilder) { }
	ngOnInit() {
		this.getUsers();
		this.registerForm = this.formBuilder.group({
		    username: ['', Validators.required],
		    email: ['', [Validators.required, Validators.email]],
		    password: ['', [Validators.required, Validators.minLength(6)]],
		    confirmPassword: ['', Validators.required]
			}, {
			});
	}
	submitted = false;

	onSubmit(data) { 
		this.submitted = true; 
		console.log(data); 
		        if (this.registerForm.invalid) {
	        return;
	    }
		let values = this.registerForm.value;

		let resp = this._demoService.createUser(values.username, values.email, values.password);
	}
   // convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	getUsers() {
		this._demoService.getUsers().subscribe(
			data => {this.users = data['users']},
			err => console.error(err),
			() => console.log('Done loading users')
		);
	}

	updateUser(user) {
		let body = {username: user.username, email: user.email};
		this._demoService.updateUser(user.id, body);
	}

	editField: string;

	updateList(id: number, property: string, event: any) {
	  const editField = event.target.textContent;
	  for (let user of this.users) {
	  		if (id == user.id) {
	  			console.log(user, editField);
	  			user[property] = editField;
	  			console.log(user);
	  		}
		}
	}

    remove(id: any) {
    	let idx = 0;
    	let f = 0
    	for (let user of this.users) {
      		if (id == user.id) {
      			f = idx
      		}
      		idx+=1
		}
		this.users.splice(f,1);
    	this._demoService.deleteUser(id);
    }

}
