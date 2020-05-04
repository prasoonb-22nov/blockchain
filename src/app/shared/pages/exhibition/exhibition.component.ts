import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorage} from 'ngx-store';

@Component({
    selector: 'app-exhibition',
    templateUrl: './exhibition.component.html',
    styleUrls: ['./exhibition.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExhibitionComponent implements OnInit {
    showMenu = false;
    @LocalStorage() language = 'en';

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
        this.handleHover();
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

    handleHover() {
        $('.exhibition-bg a').hover(function () {
            let title = $(this).attr('title');
            if (title != '') {
                $(this).attr('tmp_title', title);
                $(this).attr('title', '');
            }

        });

        $('.exhibition-bg a').click(function () {
            let title = $(this).attr('tmp_title');
            if (title != '') {
                $(this).attr('title', title);
            }
        });
    }
}
