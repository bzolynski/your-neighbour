import { Dictionary, IDictionary } from '.';

export interface ILookup<TKey, TValue>
    extends IDictionary<TKey, Array<TValue>> {}

export class Lookup<TKey, TValue>
    extends Dictionary<TKey, Array<TValue>>
    implements ILookup<TKey, TValue>
{
    private constructor(dict: Dictionary<TKey, Array<TValue>>) {
        super(dict);
    }

    public static toLookup = <TKey, TValue, TArray>(
        array: Array<TArray>,
        parentSelector: (item: TArray) => TKey,
        childSelector: (item: TArray) => TValue,
        condition: (parent: TArray, child: TArray) => boolean
    ): Lookup<TKey, TValue> => {
        const dict = array.reduce((dict, current, _, innerArray) => {
            const parent = parentSelector(current);
            if (!dict.has(parent)) dict.set(parent, new Array<TValue>());
            for (const item of innerArray) {
                if (condition(current, item)) {
                    dict.set(parent, [
                        ...dict.get(parent),
                        childSelector(item),
                    ]);
                }
            }
            return dict;
        }, new Dictionary<TKey, Array<TValue>>());

        return new Lookup<TKey, TValue>(dict);
    };
}
