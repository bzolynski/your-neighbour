import { Lookup } from "../types";

declare global {
    interface Array<T> {
        toLookup<TKey, TValue>(
            parentSelector: (item: T) => TKey,
            childSelector: (item: T) => TValue,
            condition: (parent: T, child: T) => boolean
        ): Lookup<TKey, TValue>;
    }
}
