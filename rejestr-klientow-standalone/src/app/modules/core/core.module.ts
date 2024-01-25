import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterseptor } from './interceptors/spinner.interceptor';
import { HeaderClassInterseptor } from './interceptors/header.class.interceptor';

@NgModule({
    imports: [
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderComponent, SpinnerComponent,
],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderClassInterseptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterseptor,
            multi: true,
        },
    ],
    exports: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
