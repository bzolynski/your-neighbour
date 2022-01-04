import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-text-input-with-dropdown',
	templateUrl: './text-input-with-dropdown.component.html',
	styleUrls: [ './text-input-with-dropdown.component.scss' ]
})
export class TextInputWithDropdownComponent implements OnInit, OnChanges {
	@Input() dropdownElements: any[] = [];
	@Input() displayProperty: string = '';
	constructor() {}
	ngOnChanges(changes: SimpleChanges): void {
		console.log(this.dropdownElements);
	}

	ngOnInit(): void {}
}
