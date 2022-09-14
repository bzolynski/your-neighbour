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
import { ToStringModule } from './pipes/to-string/to-string.module';
import { ButtonModule } from './ui/button/button.module';
import { TextInputModule } from './ui/text-input/text-input.module';
import { TextAreaInputModule } from './ui/text-area-input/text-area-input.module';
import { MaskInputModule } from './ui/mask-input/mask-input.module';
import { NumberInputModule } from './ui/number-input/number-input.module';
import { SelectInputModule } from './ui/select-input/select-input.module';
import { ElevationModule } from './directives/elevation/elevation.module';
import { OverlaySelectInputModule } from './ui/overlay-select-input/overlay-select-input.module';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [
        // directives
        StopPropagationModule,
        ParentHeightModule,
        ParentWidthModule,
        FocusOnLoadModule,
        CardContainerModule,
        ElevationModule,
        // pipes
        RepeatModule,
        ToStringModule,
        Base64ToDataUriModule,
        // components
        ButtonModule,
        TextInputModule,
        TextAreaInputModule,
        MaskInputModule,
        NumberInputModule,
        SelectInputModule,
        OverlaySelectInputModule,

        // 3rd party
        FlexLayoutModule,
        FlexModule,
    ],
})
export class SharedModule {}
