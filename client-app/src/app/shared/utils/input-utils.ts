import { from, fromEvent, Observable } from 'rxjs';
import { filter, first, map, mergeMap } from 'rxjs/operators';
import { IImage } from '../data-access/models';

export class InputUtils {
    static filesToDataUrl$ = (files: File[]): Observable<string> => {
        return from([...files]).pipe(
            filter((file) => /\.(jpe?g|png|gif)$/i.test(file.name)),
            map((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                return { reader, file };
            }),
            mergeMap(({ reader }) =>
                fromEvent(reader, 'load').pipe(
                    map((e) => {
                        const progressEvent = e as ProgressEvent<FileReader>;
                        if (progressEvent.target?.result) {
                            return progressEvent.target.result.toString();
                        }
                        return null;
                    }),
                    first()
                )
            ),
            filter((dataUrl): dataUrl is string => dataUrl !== null)
        );
    };

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

    static dataUrlToImage$ = (dataUrls: string[]): Observable<IImage> => {
        return from([...dataUrls]).pipe(
            filter((dataUrl) => /^data:image\/(jpe?g|png|gif);base64/i.test(dataUrl)),
            map((dataUrl) => {
                const image: IImage = {
                    // TODO: Rethink
                    name: 'TEMP NAME',
                    dataUrl: dataUrl,
                };
                return image;
            })
        );
    };
}
