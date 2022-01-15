import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
interface SettingsOption {
	name: string;
	link?: string;
	children?: SettingsOption[];
}

const options: SettingsOption[] = [
	{
		name: 'Administrator',
		children: [
			{
				name: 'Definicje kategorii',
				link: 'category-definition'
			},
			{
				name: 'Kategorie',
				link: 'category'
			}
		]
	}
];

@Component({
	selector: 'app-settings-side-bar',
	templateUrl: './settings-side-bar.component.html',
	styleUrls: [ './settings-side-bar.component.scss' ]
})
export class SettingsSideBarComponent implements OnInit {
	treeControl = new NestedTreeControl<SettingsOption>((node) => node.children);
	dataSource = new MatTreeNestedDataSource<SettingsOption>();
	constructor() {}

	ngOnInit(): void {
		this.dataSource.data = options;
	}

	hasChild = (_: number, node: SettingsOption) => !!node.children && node.children.length > 0;
}
