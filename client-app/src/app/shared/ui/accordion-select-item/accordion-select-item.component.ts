import { Component, Host, Input } from '@angular/core';
import { AccordionSelectComponent } from '../accordion-select/accordion-select.component';

@Component({
    selector: 'app-accordion-select-item',
    templateUrl: './accordion-select-item.component.html',
    styleUrls: ['./accordion-select-item.component.scss'],
})
export class AccordionSelectItemComponent<T> {
    @Input() value!: T;
    constructor(@Host() public selectComponent: AccordionSelectComponent<T>) {}
}
