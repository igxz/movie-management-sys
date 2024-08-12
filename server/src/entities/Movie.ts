import 'reflect-metadata';
import { plainToClass, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
  validate,
} from 'class-validator';

export class Movie {
  @IsNotEmpty({ message: 'movie name can not be empty' })
  @Type(() => String)
  name: string;

  @IsNotEmpty({ message: 'movie at least has one type' })
  @ArrayMinSize(1, { message: 'movie at least has one type' })
  @IsArray({ message: 'movie types must be a Array' })
  @Type(() => String)
  types: string[];

  @IsNotEmpty({ message: 'movie at least has one show region' })
  @ArrayMinSize(1, { message: 'movie at least has one show region' })
  @Type(() => String)
  showRegions: string[];

  @IsNotEmpty({ message: 'movie show time can not be empty' })
  @IsInt({ message: 'movie show time must be a integer' })
  @Min(1, { message: 'movie show time at least 1 minute' })
  @Max(600, { message: 'movie show time too long' })
  @Type(() => Number)
  showTimeInMinutes!: number;

  @IsNotEmpty({ message: 'movie popularity can not be empty' })
  @Type(() => Boolean)
  isPopular = false;

  @IsNotEmpty({ message: 'movie coming can not be empty' })
  @Type(() => Boolean)
  isComing = false;

  @IsNotEmpty({ message: 'movie classic can not be empty' })
  @Type(() => Boolean)
  isClassic = false;

  description?: string;

  poster?: string;

  constructor(
    name: string,
    types: string[],
    regions: string[],
    showTimeInMinutes: number
  ) {
    this.name = name;
    this.types = types;
    this.showRegions = regions;
    this.showTimeInMinutes = showTimeInMinutes;
  }

  /**
   * validate movie object
   */
  async validateThis(): Promise<string[]> {
    const errors = await validate(this);
    const result: string[] = [];

    errors.forEach((err) => {
      if (err.constraints) {
        result.push(...Object.values(err.constraints));
      }
    });

    return result;
  }

  /**
   * transform a plain object into a Movie object
   * @param plainObject 
   */
  public static transform(plainObject: object): Movie {
    return plainToClass(Movie, plainObject);
  }
}
