import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/http-client.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-store';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
    @LocalStorage() language = 'en';

    page = 1;
    pages = 10;
    has_next = false;
    has_prev = false;
    news = [];
    showMenu = false;

    constructor(
        private httpClientService: HttpClientService,
        private route: Router,
        private translateService: TranslateService) {
    }

    ngOnInit() {
        this.initSlider();
        this.loadNews(this.page);
    }

    handlePaginatePrev() {
        this.page -= 1;
        if (this.page === 1) {
            this.has_prev = false;
        }
        this.loadNews(this.page);
    }

    handlePaginateNext() {
        this.page += 1;
        if (this.page === this.pages) {
            this.has_next = false;
        }
        this.loadNews(this.page);
    }

    async loadNews(page?, query?) {
        await this.httpClientService.get('', {
            key: '824282b17aca5bad261771e1b8',
            page: page ? page : this.page,
            filter: this.language === 'en' ? 'tag:en' : 'tag:cn',
            limit: 14
        }).subscribe(
            (result: any) => {
                this.page = result.meta.pagination.page;
                this.pages = result.meta.pagination.pages;
                this.has_next = result.meta.pagination.next ? true : false;
                this.has_prev = result.meta.pagination.prev ? true : false;
                this.news = [];
                this.news = result.posts;
            },
            (error: any) => {
            }
        );
    }


    changeEn() {
        this.language = 'en';
        this.loadNews(this.page);
        this.translateService.use(this.language);
    }

    changeCn() {
        this.language = 'zh-cn';
        this.loadNews(this.page);
        this.translateService.use(this.language);
    }

    showMiniMenu() {
        this.showMenu = !this.showMenu;
    }

    private initSlider() {
        const container = document.querySelector('#news-content');
        const leftSlider = container.querySelector('.slider--left') as any;
        const rightSlider = container.querySelector('.slider--right') as any;
        const items = container.querySelectorAll('.item') as any;

        const maxClicks = items.length - 3;
        let numClicks = 0;

        items.forEach((item: any) => {
            item.addEventListener('transitionend', () => {
                item.style.transition = 'none';
            });
        });

        leftSlider.addEventListener('click', () => {
            if (numClicks !== 0) {
                items.forEach((item: any) => {
                    let currLeft = item.style.left ? parseFloat(item.style.left) : 0;
                    currLeft += this.GetWidth();

                    item.style.transition = 'left 0.3s';
                    item.style.left = currLeft + 'px';
                });
                numClicks--;
            }
            if (numClicks === 0) {
                leftSlider.classList.add('scroll-disable');
            } else if (numClicks > 0 && numClicks < maxClicks) {
                leftSlider.classList.remove('scroll-disable');
                rightSlider.classList.remove('scroll-disable');
            } else {
                rightSlider.classList.add('scroll-disable');
            }
        });

        rightSlider.addEventListener('click', () => {
            if (numClicks !== maxClicks) {
                items.forEach((item: any) => {
                    let currLeft = item.style.left ? parseFloat(item.style.left) : 0;
                    currLeft -= this.GetWidth();

                    item.style.transition = 'left 0.3s';
                    item.style.left = currLeft + 'px';
                });
                numClicks++;
            }
            if (numClicks === 0) {
                leftSlider.classList.add('scroll-disable');
            } else if (numClicks > 0 && numClicks < maxClicks) {
                leftSlider.classList.remove('scroll-disable');
                rightSlider.classList.remove('scroll-disable');
            } else {
                rightSlider.classList.add('scroll-disable');
            }
        });
    }

    private GetWidth() {
        const container = document.querySelector('#news-content');
        const item = container.querySelector('.item') as any;
        const style = window.getComputedStyle(item);

        return parseFloat(item.offsetWidth) +
            parseFloat(style.marginLeft) +
            parseFloat(style.marginRight);
    }
}
