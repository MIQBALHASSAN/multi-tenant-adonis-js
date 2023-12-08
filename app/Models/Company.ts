import { DateTime } from 'luxon';
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm';

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public company_name: string;

  @column()
  public phone: string | null;

  @column()
  public status: string;

  @column()
  public address: string | null;

  @column()
  public city: string | null;

  @column()
  public zipcode: string | null;

  @column()
  public state: string | null;

  @column()
  public country: string | null;

  @column()
  public logo: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
