import { from, fromEvent, Observable } from 'rxjs';
import { filter, first, map, mergeMap } from 'rxjs/operators';
import { IImage } from '../data-access/models';

export class InputUtils {
    // TODO: Rethink and make it return array not one by one
    static fileToImage$ = (files: File[]): Observable<IImage> => {
        return from([...files]).pipe(
            filter((file) => /\.(jpe?g|png|gif)$/i.test(file.name)),
            map((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                return { reader, file };
            }),
            mergeMap(({ reader, file }) =>
                fromEvent(reader, 'load').pipe(
                    map((e) => {
                        const progressEvent = e as ProgressEvent<FileReader>;
                        if (progressEvent.target?.result) {
                            const image: IImage = { name: file.name, dataUrl: progressEvent.target.result.toString() };
                            return image;
                        }
                        return null;
                    }),
                    first()
                )
            ),
            filter((image): image is IImage => image !== null)
        );
    };
}

