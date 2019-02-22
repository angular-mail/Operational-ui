import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './containers/app/app.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {mockBackendInterceptor} from './interceptors/mock-interceptor';
import {NotFoundPageComponent} from './containers/not-found-page/not-found-page.component';
import {jwtInterceptorProvider} from './interceptors/jwt-interceptor';
import {LoaderComponent} from './components/loader/loader.component';

const COMPONENTS = [AppComponent, NavbarComponent, FooterComponent, NotFoundPageComponent, LoaderComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, RouterModule, MaterialModule],
    providers: [jwtInterceptorProvider, mockBackendInterceptor],
    exports: COMPONENTS
})
export class CoreModule {}
