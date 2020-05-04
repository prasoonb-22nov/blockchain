import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

// import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class HttpClientService {
    defaultApi = 'http://localhost:2370/ghost/api/v2/content/posts';

    constructor(
        public router: Router,
        private httpClient: HttpClient,
        private sanitizer: DomSanitizer,
    ) {
    }

    public transformUnsafe(url: string): any {
        if (!url) {
            return null;
        }
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    get(url, query?: any): Observable<Response> {
        const options = this.getHttpClientOptions();
        options.params = query;
        const fullUrl = this.generateFullUrl(url);
        return this.httpClient
            .get(fullUrl, options)
            .pipe(
                map(res => res['body']),
                catchError(response => this.errorHandler(response))
            );
        // .catch(response => this.errorHandler(response));
    }

    post(url, data): Observable<Response> {
        const fullUrl = this.generateFullUrl(url);
        return this.httpClient
            .post(fullUrl, data, this.getHttpClientOptions())
            .pipe(
                map(res => res['body']),
                catchError(response => this.errorHandler(response))
            );
    }

    public imgUrl(url) {
        return this.defaultApi + url;
    }

    private generateFullUrl(url) {
        return this.defaultApi + '/' + url;
    }

    private getHttpClientOptions() {
        const headers = {};
        // headers['timeZone'] = new Date() + 'time';
        // if (token) {
        //     headers['Authorization'] = 'Bearer ' + token;
        //     headers['localTime'] = moment().format();
        // }
        return {
            observe: 'response',
            headers: headers,
        } as any;
    }

    private errorHandler(response: any): Observable<any> {
        if (response instanceof HttpErrorResponse) {
            switch (response.status) {
                case 401:
                    // this.processLogout();
                    break;
                case 422:
                case 423:
                    // this.cookie.delete(environment.authCookie, '/');
                    // sessionStorage.clear();
                    // location.href = 'authentication/sign_in';
                    return response.error;

                default:
                    return response.error;
            }
        }

        return response.error;
    }
}
