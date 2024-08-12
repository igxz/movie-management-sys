import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntity } from './BaseEntity';

export class SearchCondition extends BaseEntity {
  /**
   * page number starts from 1
   */
  @IsInt({ message: 'page number must be an Integer' })
  @Min(1, { message: 'page number minimal to be 1' })
  @Type(() => Number)
  public page = 1;

  /**
   * records per page
   */
  @IsInt({ message: 'records per page must be an Integer' })
  @Min(1, { message: 'recards per page minial to be 1' })
  @Type(() => Number)
  public limit = 10;

  /**
   * search keyword
   */
  @Type(() => String)
  public key = '';

  public static transform(plainObject: object): SearchCondition {
    return super.baseTransform(SearchCondition, plainObject);
  }
}
