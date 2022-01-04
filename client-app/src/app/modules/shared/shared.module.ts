import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputWithDropdownComponent } from './components/form/text-input-with-dropdown/text-input-with-dropdown.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ TextInputWithDropdownComponent ],
	imports: [ CommonModule, RouterModule ],
	exports: [ TextInputWithDropdownComponent ]
})
export class SharedModule {}
