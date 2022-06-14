import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthResolver implements Resolve<boolean> {
    constructor(private authService: AuthService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.checkLocalStorage();
    }
}
