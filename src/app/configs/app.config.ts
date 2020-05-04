import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
    routes: {
        heroes: 'heroes',
        error404: '404'
    },
    votesLimit: 3,
    topHeroesLimit: 4,
    snackBarDuration: 3000,
};
