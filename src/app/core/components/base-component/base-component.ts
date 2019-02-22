import {Subject} from 'rxjs';
import {LoaderService} from '../../services/loader.service';
import {OnDestroy} from '@angular/core';

export abstract class BaseComponent implements OnDestroy {
    constructor(private loaderService: LoaderService) {}

    ngUnsubscribe: Subject<void> = new Subject<void>();
    pending = false;

    get isLoading() {
        return this.loaderService.currentState;
    }

    set isLoading(isLoading: boolean) {
        if (isLoading) {
            this.loaderService.show();
        } else {
            this.loaderService.hide();
        }
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
