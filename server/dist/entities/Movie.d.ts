import 'reflect-metadata';
export declare class Movie {
    name: string;
    types: string[];
    showRegions: string[];
    showTimeInMinutes: number;
    isPopular: boolean;
    isComing: boolean;
    isClassic: boolean;
    description?: string;
    poster?: string;
    constructor(name: string, types: string[], regions: string[], showTimeInMinutes: number);
    validateThis(): Promise<string[]>;
    static transform(plainObject: object): Movie;
}
