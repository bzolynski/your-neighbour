import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-spinner-button',
	templateUrl: './spinner-button.component.html',
	styleUrls: [ './spinner-button.component.scss' ]
})
export class SpinnerButtonComponent implements OnInit {
	@Input() disabled: boolean = false;
	@Input() spinning: boolean = false;
	@Input() type: string = 'button';
	constructor() {}

	ngOnInit(): void {}
}
