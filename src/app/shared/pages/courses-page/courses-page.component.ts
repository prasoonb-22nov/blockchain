import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {bounce, fadeInLeft} from 'ng-animate';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorage} from 'ngx-store';


@Component({
    selector: 'app-courses-page',
    templateUrl: './courses-page.component.html',
    styleUrls: ['./courses-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CoursesPageComponent implements OnInit {
    msbapAudioUrl = 'assets/audio/blockchain.mp3';
    showMenu = false;
    audioPlaying = false;
    @LocalStorage() language = 'en';

    @ViewChild('audioOption') audioPlayerRef: ElementRef;

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

    onAudioPlay() {
        this.audioPlaying = true;
        this.audioPlayerRef.nativeElement.play();
    }

    onAudioStop() {
        this.audioPlaying = false;
        this.audioPlayerRef.nativeElement.pause();
        this.audioPlayerRef.nativeElement.currentTime = 0;
    }
}
