import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorage} from 'ngx-store';


@Component({
    selector: 'app-events-page',
    templateUrl: './events-page.component.html',
    styleUrls: ['./events-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EventsPageComponent implements OnInit {
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
        $('.events-card a').hover(function () {
            // Get the current title
            let title = $(this).attr('title');
            if (title != '') {
                // Store it in a temporary attribute
                $(this).attr('tmp_title', title);
                // Set the title to nothing so we don't see the tooltips
                $(this).attr('title', '');
            }

        });

        $('.events-card a').click(function () {// Fired when we leave the element

            // Retrieve the title from the temporary attribute
            let title = $(this).attr('tmp_title');
            if (title != '') {
                // Return the title to what it was
                $(this).attr('title', title);
            }
        });
    }
}
