import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './item-card.component';
import { CardModule } from 'src/app/shared/ui/card/card.module';
import { CardImgModule } from 'src/app/shared/ui/card-img/card-img.module';
import { CardContentModule } from 'src/app/shared/ui/card-content/card-content.module';
import { CardFooterModule } from 'src/app/shared/ui/card-footer/card-footer.module';

@NgModule({
    imports: [CommonModule, CardModule, CardImgModule, CardContentModule, CardFooterModule],
    declarations: [ItemCardComponent],
    exports: [ItemCardComponent],
})
export class ItemCardModule {}
