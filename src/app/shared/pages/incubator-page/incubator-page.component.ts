import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorage} from 'ngx-store';


@Component({
    selector: 'app-incubator-page',
    templateUrl: './incubator-page.component.html',
    styleUrls: ['./incubator-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class IncubatorPageComponent implements OnInit {
    showMenu = false;
    @LocalStorage() language = 'en';

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
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
}
