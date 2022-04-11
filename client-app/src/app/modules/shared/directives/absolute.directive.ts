import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appPosAbsolute]',
})
export class AbsoluteDirective {
    @HostBinding('style.position') position = 'absolutes';
}
