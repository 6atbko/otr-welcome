import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './app/components/login-form/login-form.component';
import { WelcomePageComponent } from './app/components/welcome-page/welcome-page.component';
import { AuthGuard } from './app/shared/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, LoginFormComponent, WelcomePageComponent],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
