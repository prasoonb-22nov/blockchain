import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {WebpackTranslateLoader} from './webpack-translate-loader';
import {APP_CONFIG, AppConfig} from './configs/app.config';
import {SharedModule} from './shared/shared.module';
import {APP_BASE_HREF} from '@angular/common';


@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: WebpackTranslateLoader
            }
        }),
        CoreModule,
        SharedModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        //{provide: APP_BASE_HREF, useValue: '/'},
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
