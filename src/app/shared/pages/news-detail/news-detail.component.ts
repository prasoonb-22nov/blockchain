import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpClientService} from '../../service/http-client.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorage} from 'ngx-store';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class NewsDetailComponent implements OnInit {
    id: any;
    elementHtml: any;
    title: any;
    pushedTime: any;
    author: any;
    showMenu = false;
    news = [];
    @LocalStorage() language = 'en';

    constructor(
        private httpClientService: HttpClientService,
        private activatedRoute: ActivatedRoute,
        private translateService: TranslateService,
        private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const postId = event.urlAfterRedirects.split('/')[2];
                this.loadContent(postId);
            }
        });
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.loadContent(this.id);
        this.loadNews();
    }

    loadNews() {
        this.httpClientService.get('', {
            key: '824282b17aca5bad261771e1b8',
            limit: 5,
            filter: this.language === 'en' ? 'tag:en' : 'tag:cn',
            order: 'published_at'
        }).subscribe(
            (result: any) => {
                this.news = result.posts;
            },
            (error: any) => {
            }
        );
    }

    changeEn() {
        this.language = 'en';
        this.translateService.use(this.language);
    }

    changeCn() {
        this.language = 'zh-cn';
        this.translateService.use(this.language);
    }

    showMiniMenu() {
        this.showMenu = !this.showMenu;
    }

    private loadContent(id) {
        this.httpClientService.get(id, {
            key: '824282b17aca5bad261771e1b8',
            include: 'authors'}).subscribe(
            (result: any) => {
                this.elementHtml = result.posts[0].html;
                this.title = result.posts[0].title;
                this.pushedTime = result.posts[0].published_at;
                this.author = result.posts[0].authors[0].name ? result.posts[0].authors[0].name : '';
            },
            (error: any) => {
            }
        );
    }
}
