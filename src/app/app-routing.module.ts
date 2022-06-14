import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './app/components/login-form/login-form.component';
import { WelcomePageComponent } from './app/components/welcome-page/welcome-page.component';
import { AuthGuard } from './app/shared/auth.guard';
import { AuthResolver } from './app/shared/auth.resolver';

const routes: Routes = [
    {
        path: '',
        component: LoginFormComponent,
        resolve: {
            auth: AuthResolver,
        },
    },
    {
        path: 'welcome',
        component: WelcomePageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '/welcome',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
