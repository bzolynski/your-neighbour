export interface IDictionary<TKey, TValue> extends Map<TKey, TValue> {
    containsValue: (value: TValue) => boolean;
    get: (key: TKey) => TValue;
}

export class Dictionary<TKey, TValue>
    extends Map<TKey, TValue>
    implements IDictionary<TKey, TValue>
{
    constructor();
    constructor(dict: IDictionary<TKey, TValue>);
    constructor(dict?: IDictionary<TKey, TValue>) {
        super(dict ?? new Map<TKey, TValue>());
    }

    containsValue = (value: TValue): boolean => {
        return Array.from(super.values()).findIndex((x) => x == value) > -1;
    };

    get = (key: TKey): TValue => {
        if (!super.has(key)) throw new Error('Key missing in dictionary!');
        return super.get(key)!;
    };
}
