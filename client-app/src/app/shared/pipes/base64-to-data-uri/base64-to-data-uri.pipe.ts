import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'base64ToDataUri',
})
export class Base64ToDataUriPipe implements PipeTransform {
    transform(base64: Blob): string {
        return 'data:image/jpg;base64,' + base64;
    }
}
