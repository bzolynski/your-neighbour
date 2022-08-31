import { Directive, HostBinding, Input } from '@angular/core';

type CardType = 'normal' | 'darker';

@Directive({
    selector: '[appCardContainer]',
})
export class CardContainerDirective {
    //hsl(210, 17%, 98%)
    @Input('appCardContainer') set type(value: CardType | '') {
        if (value === '') this.bgColor = 'hsl(0, 0%, 100%)';
        else this.bgColor = value === 'normal' ? 'hsl(0, 0%, 100%)' : 'hsl(210, 17%, 98%)';
    }
    @HostBinding('style.backgroundColor') bgColor = 'hsl(0, 0%, 100%)';
    @HostBinding('style.color') color = 'hsl(210, 9%, 31%)';
    @HostBinding('style.border') border = '1px solid hsl(210, 14%, 89%)';
    @HostBinding('style.borderRadius') borderRadius = '6px';
}
