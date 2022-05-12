import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService } from './modules/core/services/message.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    title = 'client-app';
    //isBusy = true;
    isBusy = false;
    unsubscriber$: Subject<boolean> = new Subject();

    constructor(private messageService: MessageService) {
        /*
        authenticationService
            .getCurrentUser()
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe(
                (res) => {
                    this.isBusy = false;
                },
                (errorResponse) => {
                    console.log(errorResponse);

                    this.messageService.showMessage(errorResponse.message ?? 'Unexpected error', 'error');
                },
                () => {
                    this.isBusy = false;
                }
            );
            */
    }
    ngOnDestroy(): void {
        this.unsubscriber$.next(true);
        this.unsubscriber$.unsubscribe();
    }
}
