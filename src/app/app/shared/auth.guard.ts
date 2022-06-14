import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.authService.isLoggedIn().pipe(
            switchMap((isAuth: boolean) => {
                if (isAuth) {
                    return of(true);
                }
                this.router.navigate(['/']);
                return of(false);
            })
        );
    }
}
