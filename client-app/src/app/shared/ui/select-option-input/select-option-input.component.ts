import { Component, Host, Input, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { SelectInputComponent } from '../select-input/select-input.component';

@Component({
    selector: 'app-select-option-input',
    templateUrl: './select-option-input.component.html',
    styleUrls: ['./select-option-input.component.scss'],
})
export class SelectOptionInputComponent implements OnInit {
    @ViewChild('option', { read: MatOption, static: true })
    option!: MatOption;
    @Input()
    set value(val: any) {
        this.stringifyValue = val.toString();
    }
    stringifyValue: string = '';
    constructor(@Host() public selectInput: SelectInputComponent) {}
    ngOnInit(): void {
        this.selectInput.select.options.reset([...this.selectInput.select.options, this.option]);
        console.log(this.selectInput.select.options);
    }
}
