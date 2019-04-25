import {Observable, ReplaySubject} from 'rxjs';
export class CacheableRequest <T> {

    private subject: ReplaySubject<T> = new ReplaySubject(1);
    private request: Observable<T>;

    getCache(request: Observable<T>, refresh = false) {
        if (refresh || !this.request) {
            this.request = request;

            this.request.subscribe(
                result => this.subject.next(result),
                err => this.subject.error(err)
            );
        }

        return this.subject.asObservable();
    }

    clear() {
        this.request = null;
    }
}