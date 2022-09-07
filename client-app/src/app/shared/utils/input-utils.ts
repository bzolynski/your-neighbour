import { from, fromEvent } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export class InputUtils {
    static resizeImages$ = (src: string[], maxWidth: number) => {
        return from(src).pipe(
            map((src) => {
                const img = new Image();
                img.src = src;
                return img;
            }),
            mergeMap((img) =>
                fromEvent(img, 'load').pipe(
                    map((e: any) => {
                        const canvas = document.createElement('canvas');
                        const scale = maxWidth / e.target.width;
                        canvas.width = maxWidth;
                        canvas.height = e.target.width * scale;

                        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                        ctx.drawImage(img, 0, 0, canvas.height, canvas.width);
                        return ctx.canvas.toDataURL();
                    })
                )
            )
        );
    };
}
