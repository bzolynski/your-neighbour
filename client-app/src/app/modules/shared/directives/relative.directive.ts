import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appPosRelative]',
})
export class RelativeDirective {
    @HostBinding('style.position') position = 'relative';
}
