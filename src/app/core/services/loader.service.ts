import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoaderService {
    public loaderState = new BehaviorSubject<boolean>(false);

    constructor() {}

    show() {
        this.loaderState.next(true);
    }

    hide() {
        this.loaderState.next(false);
    }

    getLoaderState$(): Observable<boolean> {
        return this.loaderState.asObservable();
    }

    get currentState(): boolean {
        return this.loaderState.getValue();
    }
}
