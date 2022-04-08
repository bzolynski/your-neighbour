import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-advertisement-form-item-select',
    templateUrl: './advertisement-form-item-select.component.html',
    styleUrls: ['./advertisement-form-item-select.component.scss'],
})
export class AdvertisementFormItemSelectComponent implements OnInit {
    itemSelectPanelOpen: boolean = false;
    constructor() {}

    ngOnInit(): void {}
}
