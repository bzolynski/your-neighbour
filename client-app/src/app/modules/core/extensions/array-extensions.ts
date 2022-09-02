import { Lookup } from '@app-types/.';
if (!Array.prototype.toLookup) {
    Array.prototype.toLookup = function <T, TKey, TValue>(
        this: T[],
        parentSelector: (item: T) => TKey,
        childSelector: (item: T) => TValue,
        condition: (parent: T, child: T) => boolean
    ): Lookup<TKey, TValue> {
        return Lookup.toLookup(this, parentSelector, childSelector, condition);
    };
}
