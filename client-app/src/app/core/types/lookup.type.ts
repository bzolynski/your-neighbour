import { Dictionary, IDictionary, Tree, ITree } from '@core/types/.';
export interface ILookup<TKey, TValue> extends IDictionary<TKey, Array<TValue>> {
    //toTree(this: ILookup<TKey, TKey>): ITree<TKey>;
    toTree(this: ILookup<TKey, TKey>, rootSelector: (item: ILookup<TKey, TKey>) => [TKey, TKey[]]): ITree<TKey>;
}

export class Lookup<TKey, TValue> extends Dictionary<TKey, Array<TValue>> implements ILookup<TKey, TValue> {
    private constructor(dict: IDictionary<TKey, Array<TValue>>) {
        super(dict);
    }

    static toLookup = <TKey, TValue, TArray>(
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
                    dict.set(parent, [...dict.get(parent), childSelector(item)]);
                }
            }
            return dict;
        }, new Dictionary<TKey, Array<TValue>>());

        return new Lookup<TKey, TValue>(dict);
    };

    toTree(this: ILookup<TKey, TKey>, rootSelector: (item: ILookup<TKey, TKey>) => [TKey, TKey[]]): ITree<TKey> {
        return Tree.fromLookup<TKey>(this, rootSelector);
    }
}
