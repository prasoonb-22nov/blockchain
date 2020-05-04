import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Hero} from './hero.model';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {LoggerService} from '../../../core/services/logger.service';
import {AppConfig} from '../../../configs/app.config';
import {AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    private heroesCollection: AngularFirestoreCollection<Hero>;

    constructor(
        private translateService: TranslateService,
        private snackBar: MatSnackBar) {
    }

    static checkIfUserCanVote(): boolean {
        return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
    }

    private static handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            LoggerService.log(`${operation} failed: ${error.message}`);

            if (error.status >= 500) {
                throw error;
            }

            return of(result as T);
        };
    }

    getHeroes(): Observable<Hero[]> {
        return this.heroesCollection.snapshotChanges()
            .pipe(
                map((actions) => {
                    return actions.map((action) => {
                        const data = action.payload.doc.data();
                        return new Hero({id: 1, ...data});
                    });
                }),
                tap(() => LoggerService.log(`fetched heroes`)),
                catchError(HeroService.handleError('getHeroes', []))
            );
    }


    createHero(hero: Hero): Promise<DocumentReference> {
        return this.heroesCollection.add(JSON.parse(JSON.stringify(hero))).then((document: DocumentReference) => {
            LoggerService.log(`added hero w/ id=${document.id}`);
            this.showSnackBar('heroCreated');
            return document;
        }, (error) => {
            HeroService.handleError<any>('createHero', error);
            return error;
        });
    }

    showSnackBar(name): void {
        this.translateService.get([String(_('heroCreated')), String(_('saved')),
            String(_('heroLikeMaximum')), String(_('heroRemoved'))], {'value': AppConfig.votesLimit}).subscribe((texts) => {
            const config: any = new MatSnackBarConfig();
            config.duration = AppConfig.snackBarDuration;
            this.snackBar.open(texts[name], 'OK', config);
        });
    }
}
