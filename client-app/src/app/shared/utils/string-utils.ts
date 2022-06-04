export class StringHelperMethods {
    static isNullOrWhiteSpace = (value: string | null | undefined): boolean => {
        return value === null || value === undefined || value === '';
    };
}
