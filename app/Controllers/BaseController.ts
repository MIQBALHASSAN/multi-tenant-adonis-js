import { BaseModel } from '@ioc:Adonis/Lucid/Orm';

export class BaseController {
  public MODEL: typeof BaseModel;
}
