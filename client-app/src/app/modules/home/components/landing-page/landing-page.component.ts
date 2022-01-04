import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: [ './landing-page.component.scss' ]
})
export class LandingPageComponent implements OnInit {
	constructor() {}

	jakisArray = [
		{ id: 1, name: 'jan', numer: 'drugi' },
		{ id: 2, name: 'jan', numer: 'drugi' },
		{ id: 3, name: 'jan', numer: 'drugi' },
		{ id: 4, name: 'jan', numer: 'drugi' },
		{ id: 5, name: 'jan', numer: 'drugi' },
		{ id: 6, name: 'jan', numer: 'drugi' }
	]; /*
	jakisArray = [
		'Jan',
		'Paweł',
		'Drugi',
		'Jan',
		'Paweł',
		'Drugi',
		'Jan',
		'Paweł',
		'Drugi',
		'Jan',
		'Paweł',
		'Drugi'
	];
*/
	ngOnInit(): void {}
}
