import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { loadAdvertisements } from '../../data-access/store/home/home.actions';
import { selectAdvertisements, selectError, selectStatus } from '../../data-access/store/home/home.selectors';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    responsiveOptions = [
        {
            breakpoint: '960px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '780px',
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1,
        },
    ];
    #advertisements$ = this.store.select(selectAdvertisements);
    #status$ = this.store.select(selectStatus);
    #error$ = this.store
        .select(selectError)
        .pipe(tap((error) => (error ? this.messageService.showMessage(error, 'error') : undefined)));

    vm$ = combineLatest([this.#advertisements$, this.#status$, this.#error$]).pipe(
        map(([advertisements, status, error]) => ({ advertisements, status, error }))
    );

    constructor(private store: Store, private messageService: MessageService) {}

    ngOnInit(): void {
        this.store.dispatch(loadAdvertisements({ quantity: 10 }));
    }
}
