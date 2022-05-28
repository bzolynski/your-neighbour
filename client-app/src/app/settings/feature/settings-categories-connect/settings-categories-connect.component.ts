import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { IconDefinition, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/modules/core/services';
import { MessageService } from 'src/app/modules/core/services/message.service';
import { Dictionary } from 'src/app/modules/core/types';
import { ChildParentPair } from 'src/app/modules/core/types/child-parent-pair.type';
import { DragEndEventProps } from 'src/app/modules/tree-view/models';
import { ICategory } from 'src/app/shared/data-access/models';
import {
    loadTree,
    loadUnasignedCategories,
    selectChanges,
    selectTree,
    selectUnasignedCategories,
} from '../../data-access/store/settings-categories-connect';

// TODO: REBUILD THIS COMPONENT

@Component({
    selector: 'app-settings-categories-connect',
    templateUrl: './settings-categories-connect.component.html',
    styleUrls: ['./settings-categories-connect.component.scss'],
})
export class SettingsCategoriesConnectComponent implements OnInit {
    tree$ = this.store.select(selectTree);
    unasignedCategories$ = this.store.select(selectUnasignedCategories);
    changes$ = this.store.select(selectChanges);

    faChevronDown: IconDefinition = faChevronDown;
    parentChanges: Dictionary<number, number | null> = new Dictionary<number, number | null>();
    constructor(private categoryService: CategoryService, private messageService: MessageService, private store: Store) {}

    canDeactivate = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        if (!this.parentChanges.keys().next().value) return true;
        return this.messageService.showConfirmationDialog('Czy chcesz odrzucić niezapisane zmiany?').pipe(map((x) => x.result));
    };

    ngOnInit(): void {
        this.store.dispatch(loadTree());
        this.store.dispatch(loadUnasignedCategories());
    }

    treeDragEnd = (data: DragEndEventProps<ICategory>): void => {
        let parentId: number | undefined = undefined;
        switch (data.dropLocation) {
            case 'above':
            case 'bellow': {
                parentId = data.draggedOver?.parent?.data.id;
                break;
            }
            case 'inside': {
                parentId = data.draggedOver?.data.id;
                break;
            }
            default: {
                parentId = undefined;
                break;
            }
        }
        // todo: change history.
        //if (data.dragged.parent?.data.id == parentId) this.parentChanges.delete(data.dragged.data.id);
        //else
        this.parentChanges.set(data.dragged.data.id, parentId ?? null);
    };

    submitChanges = () => {
        const childParentPairs = Array.from(this.parentChanges, ([key, value]) => {
            return new ChildParentPair(key, value);
        });

        this.categoryService.changeParent(childParentPairs).subscribe(
            (response) => {
                this.parentChanges.clear();
                this.messageService.showMessage('Pomyślnie zaktualizowano kategorie!', 'success');
            },
            (error: HttpErrorResponse) => {
                this.messageService.showMessage(error.message, 'error');
            }
        );
    };
}
