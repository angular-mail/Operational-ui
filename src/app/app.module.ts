import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './core/containers/app/app.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core';
import {AuthModule} from './auth/auth.module';

@NgModule({
    imports: [
        BrowserModule,
        AuthModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        CoreModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
