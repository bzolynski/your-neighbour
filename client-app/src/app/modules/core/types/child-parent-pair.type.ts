export interface IChildParentPair {
    childId: number;
    parentId: number | null;
}

export class ChildParentPair implements IChildParentPair {
    constructor(public childId: number, public parentId: number | null) {}
}
