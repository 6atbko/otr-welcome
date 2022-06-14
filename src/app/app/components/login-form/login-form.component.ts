import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    public loginErrors: string[] = [];
    public passwordErrors: string[] = [];
    private regExp: string =
        '(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9\\d@$!%*#?&]{5,}';
    private subscriptions: Subscription[] = [];
    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.route.data.subscribe((data) => {
                if (data?.['auth']) {
                    this.router.navigate(['/welcome']);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
        this.subscriptions = [];
    }

    public loginFormGroup = new FormGroup({
        login: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(this.regExp),
            Validators.minLength(5),
        ]),
    });

    public onSubmit() {
        if (this.loginFormGroup.invalid) {
            this.getValidationErrors();
        }
        if (this.loginFormGroup.valid) {
            this.authService.login();
            this.router.navigate(['/welcome']);
        }
    }

    private getValidationErrors() {
        let loginControl = this.loginFormGroup.get('login'),
            passwordControl = this.loginFormGroup.get('password');
        this.loginErrors = [];
        this.passwordErrors = [];
        if (loginControl?.invalid) {
            loginControl?.errors &&
                this.fillErrorArrays(loginControl, this.loginErrors);
        }
        if (passwordControl?.invalid) {
            passwordControl?.errors &&
                this.fillErrorArrays(passwordControl, this.passwordErrors);
        }
    }

    private fillErrorArrays(control: any, errorArray: string[]) {
        Object.keys(control.errors).forEach((errorKey) => {
            switch (errorKey) {
                case 'required':
                    errorArray.push('Это поле обязательное.');
                    break;
                case 'minlength':
                    let charectersLeft =
                        control?.errors?.['minlength'].requiredLength -
                        control?.errors?.['minlength'].actualLength;
                    errorArray.unshift(`Это поле слишком короткое. Введите ещё 
                      ${charectersLeft} ${
                        charectersLeft > 1 ? 'символа' : 'символ'
                    }.`);
                    break;
                case 'pattern':
                    this.matchPattern(control?.errors?.[errorKey].actualValue);
                    break;
            }
        });
    }

    private matchPattern(formControl: string): void {
        if (formControl.search('(?=.*[A-Z])')) {
            this.passwordErrors.push(
                'Необходима хотя бы одна заглавная латинская буква'
            );
        }
        if (formControl.search('(?=.*[a-z])')) {
            this.passwordErrors.push(
                'Необходима хотя бы одна строчная латинская буква'
            );
        }
        if (formControl.search('(?=.*[0-9])')) {
            this.passwordErrors.push('Необходима хотя бы одна цифра');
        }
        if (formControl.search('(?=.*[@$!%*#?&])')) {
            this.passwordErrors.push(
                'Необходим хотя бы один спецсимвол(@$!%*#?&)'
            );
        }
    }
}
