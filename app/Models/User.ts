import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
  column,
  beforeSave,
  BaseModel,
  afterFetch,
  BelongsTo,
  belongsTo,
} from '@ioc:Adonis/Lucid/Orm';
import Company from 'App/Models/Company';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public companyId: number;

  @column()
  public email: string;

  @column()
  public user_type: string;

  @column()
  public status: string;

  @column()
  public password: string;

  @column()
  public isPhoneVerified: boolean;

  @column()
  public isEmailVerified: boolean;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  // Relations
  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>;

  // delete password for fetched user
  @afterFetch()
  public static deletePasswordList(users: User[]) {
    users.forEach((user) => {
      delete user.$attributes.password;
    });
  }
}
