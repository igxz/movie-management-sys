import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export abstract class BaseEntity {
  /**
   * validate object
   */
  async validateThis(skipMissingPros = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMissingPros,
    });
    const result: string[] = [];

    errors.forEach((err) => {
      if (err.constraints) {
        result.push(...Object.values(err.constraints));
      }
    });

    return result;
  }

  /**
   * transform a plain object into any T type object
   * @param plainObject
   */
  protected static baseTransform<T>(cls: ClassConstructor<T>, plainObject: object): T {
    if (plainObject instanceof cls) {
      return plainObject;
    }

    return plainToClass(cls, plainObject);
  }
}
