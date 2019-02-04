import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {observable} from 'rxjs';

@Injectable()
export class DemoService {

    constructor(private http:HttpClient) {
    }

    // Uses http.get() to load data from a single API endpoint
    getUsers() {
        return this.http.get('http://127.0.0.1:5000/users');
    }

    createUser(username: string,  email: string, password: string) {
        console.log(username);
        const body = {
            'username' : username,
            'password' : password, 
            'email' : email
        };

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        this.http.post('http://127.0.0.1:5000/user',
                body, {headers: headers})
            .subscribe(
                (val) => {
                    return val; 
                },
                response => {
                    console.log("POST call in error", response);
                },
                () => {
                    console.log("The POST observable is now completed.");
        });
    }


    deleteUser(id : string) {
        this.http.delete('http://127.0.0.1:5000/user/'+id)
                    .subscribe(
                (val) => {
                    console.log("delete call successful value returned in body", 
                                val);
                },
                response => {
                    console.log("delete call in error", response);
                },
                () => {
                    console.log("The delete observable is now completed.");
        });
    }

    updateUser(id: string, body) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
       this.http.patch('http://127.0.0.1:5000/user/'+id,
        body, {headers: headers})
            .subscribe(
                (val) => {
                    console.log("patch call successful value returned in body", 
                                val);
                },
                response => {
                    console.log("patch call in error", response);
                },
                () => {
                    console.log("The patch observable is now completed.");
        });
    }

}




