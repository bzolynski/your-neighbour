
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-settings-side-bar-group',
  templateUrl: './settings-side-bar-group.component.html',
  styleUrls: ['./settings-side-bar-group.component.scss']
})
export class SettingsSideBarGroupComponent implements OnInit {
    private expanded: boolean = false;
    @ViewChild('optionList') optionList! : ElementRef;
	constructor() {}

	ngOnInit(): void {}

	toggleExpand = () => {
		(<HTMLElement>this.optionList.nativeElement).classList.toggle('expanded');
	};

}
