export const objectEntries = Object.entries as <T>(obj: T) => Array<[keyof T, T[keyof T]]>;
