import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    public logOut() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
