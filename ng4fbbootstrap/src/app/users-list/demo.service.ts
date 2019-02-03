import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin':'*'})
};

@Injectable()
export class DemoService {

    constructor(private http:HttpClient) {
    }

    // NOTE: all API calls in this file use simple endpoints served by
    // an Express app in the file app.js in the repo root. See that file
    // for all back-end code.

    // Uses http.get() to load data from a single API endpoint
    getUsers() {
        return this.http.get('http://127.0.0.1:5000/users');
    }

}




