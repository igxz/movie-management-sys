import 'reflect-metadata';
import { BaseEntity } from './BaseEntity';
export declare class Movie extends BaseEntity {
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
    static transform(plainObject: object): Movie;
}
