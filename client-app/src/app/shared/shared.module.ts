import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Base64ToDataUriModule } from './pipes/base64-to-data-uri/base64-to-data-uri.module';
import { RepeatModule } from './directives/repeat/repeat.module';
import { StopPropagationModule } from './directives/stop-propagation/stop-propagation.module';
import { ParentHeightModule } from './directives/parent-height/parent-height.module';
import { ParentWidthModule } from './directives/parent-width/parent-width.module';
import { FocusOnLoadModule } from './directives/focus-on-load/focus-on-load.module';
import { CardContainerModule } from './directives/card-container/card-container.module';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [
        Base64ToDataUriModule,
        RepeatModule,
        StopPropagationModule,
        ParentHeightModule,
        ParentWidthModule,
        FocusOnLoadModule,
        CardContainerModule,
        FlexLayoutModule,
        FlexModule,
    ],
})
export class SharedModule {}
