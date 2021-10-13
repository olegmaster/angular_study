import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, delay} from 'rxjs/operators';
import {throwError} from "rxjs";

export interface User {
    id: number;
    name: string;
    email: string;
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: number,
            lng: number
        }
    };
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) {
    }

    getUsers() {
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
            .pipe(delay(200), catchError(error => {
                console.log('get users errror', error);
                return throwError(error);
            }));
    }
}
