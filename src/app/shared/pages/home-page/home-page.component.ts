import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {LocalStorage} from 'ngx-store';

declare var AMap: any;    // 一定要声明AMap，要不然报错找不到AMap

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class HomePageComponent implements OnInit {
    showMenu = false;
    heroes: Hero[] = null;
    @LocalStorage() language = 'en';

    constructor(private heroService: HeroService,
                private translateService: TranslateService,
                private router: Router) {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.language = event.lang;
        });
        router.events.subscribe((val) => {
            this.language = this.translateService.currentLang;
        });
    }

    // @HostListener('click', ['$event'])
    // onClick(ev) {
    //     // do something meaningful with it
    //     console.log(`The user just pressed ${ev}!`);
    // }

    ngOnInit() {
        // images slide
        this.initSlider();
    }

    showMiniMenu() {
        this.showMenu = !this.showMenu;
    }

    changeEn() {
        this.language = 'en';
        this.translateService.use(this.language);
    }

    changeCn() {
        this.language = 'zh-cn';
        this.translateService.use(this.language);
    }

    private initSlider() {
        const container = document.querySelector('#what-do-we-do');
        const leftSlider = container.querySelector('.slider--left');
        const rightSlider = container.querySelector('.slider--right');
        const items = container.querySelectorAll('.item');
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
        const container = document.querySelector('#what-do-we-do');
        const item = container.querySelector('.item') as any;
        const style = window.getComputedStyle(item);

        return parseFloat(item.offsetWidth) +
            parseFloat(style.marginLeft) +
            parseFloat(style.marginRight);
    }
}
