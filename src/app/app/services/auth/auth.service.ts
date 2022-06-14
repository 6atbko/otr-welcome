import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authSubject = new BehaviorSubject(false);

    public login() {
        localStorage.setItem('isLoggedIn', 'true');
        this.authSubject.next(true);
    }

    public logout() {
        localStorage.removeItem('isLoggedIn');
        this.authSubject.next(false);
    }

    public isLoggedIn(): Observable<boolean> {
        return this.authSubject.asObservable();
    }

    public checkLocalStorage() {
        if (localStorage.getItem('isLoggedIn')) {
            this.login();
            return true;
        }
        this.logout();
        return false;
    }

    constructor() {}
}
