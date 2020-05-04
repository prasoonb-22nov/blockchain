import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404PageComponent} from './shared/pages/error404-page/error404-page.component';
import {HomePageComponent} from './shared/pages/home-page/home-page.component';
import {AppConfig} from './configs/app.config';
import {CoursesPageComponent} from './shared/pages/courses-page/courses-page.component';
import {ExhibitionComponent} from './shared/pages/exhibition/exhibition.component';
import {EventsPageComponent} from './shared/pages/events-page/events-page.component';
import { NewsComponent } from './shared/pages/news/news.component';
import { NewsDetailComponent } from './shared/pages/news-detail/news-detail.component';
import {IncubatorPageComponent} from "./shared/pages/incubator-page/incubator-page.component";

const routes: Routes = [
    {path: '', component: HomePageComponent, pathMatch: 'full'},
    {path: AppConfig.routes.error404, component: Error404PageComponent},
    {path: 'courses', component: CoursesPageComponent},
    {path: 'exhibition', component: ExhibitionComponent},
    {path: 'events', component: EventsPageComponent},
    {path: 'news', component: NewsComponent},
    {path: 'news/:id', component: NewsDetailComponent},
    {path: 'incubator', component: IncubatorPageComponent},
    // otherwise redirect to 404
    {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            useHash: false
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
