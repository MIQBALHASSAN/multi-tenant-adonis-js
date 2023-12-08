import { BaseController } from 'App/Controllers/BaseController';
import HttpCodes from 'App/Enums/HttpCodes';
import User from 'App/Models/User';

export default class UsersController extends BaseController {
  public MODEL: typeof User;

  constructor() {
    super();
    this.MODEL = User;
  }

  // find all users  list
  public async findAllRecords({ request, response }) {
    let DQ = this.MODEL.query();

    const page = request.input('page');
    const pageSize = request.input('pageSize');

    if (!DQ) {
      return response.notFound({
        code: HttpCodes.NOT_FOUND,
        message: 'Users Not Found',
      });
    }

    if (pageSize) {
      return response.ok({
        code: HttpCodes.SUCCESS,
        message: 'Users find Successfully',
        result: await DQ.preload('company').paginate(page, pageSize),
      });
    } else {
      return response.ok({
        code: HttpCodes.SUCCESS,
        message: 'Users find Successfully',
        result: await DQ.preload('company'),
      });
    }
  }

  // find single user by id
  public async findSingleRecord({ request, response }) {
    try {
      const DQ = await this.MODEL.query()
        .where('id', request.param('id'))
        .preload('company')
        .first();

      if (DQ) {
        delete DQ.$attributes.password;
      }

      return response.ok({
        code: HttpCodes.SUCCESS,
        message: 'User find Successfully!',
        result: DQ,
      });
    } catch (e) {
      return response.internalServerError({
        code: HttpCodes.SERVER_ERROR,
        message: e.toString(),
      });
    }
  }

  // create new user
  public async create({ auth, request, response }) {
    const currentUser = auth.user!;
    try {
      let DE = await this.MODEL.findBy('email', request.body().email);
      if (DE && !DE.isEmailVerified) {
        delete DE.$attributes.password;

        return response.conflict({
          code: HttpCodes.CONFLICTS,
          message: `Provided Email: ' ${request.body().email} ' Already exists`,
        });
      }

      const DM = new this.MODEL();

      DM.companyId = currentUser.companyId;
      DM.email = request.body().email;
      DM.status = request.body().status;
      DM.password = request.body().password;

      await DM.save();

      delete DM.$attributes.password;
      return response.ok({
        code: HttpCodes.SUCCESS,
        message: 'User Register Successfully!',
        result: DM,
      });
    } catch (e) {
      console.log('register error', e.toString());
      return response.internalServerError({
        code: HttpCodes.SERVER_ERROR,
        message: e.toString(),
      });
    }
  }

  // update user
  public async update({ request, response }) {
    const DQ = await this.MODEL.findBy('id', request.param('id'));
    if (!DQ) {
      return response.notFound({
        code: HttpCodes.NOT_FOUND,
        message: 'User Not Found',
      });
    }

    DQ.email = request.body().email;
    DQ.status = request.body().status;

    await DQ.save();

    delete DQ.$attributes.password;
    return response.ok({
      code: HttpCodes.SUCCESS,
      message: 'User Update successfully.',
      result: DQ,
    });
  }

  // delete single user using id
  public async destroy({ request, response }) {
    const DQ = await this.MODEL.findBy('id', request.param('id'));
    if (!DQ) {
      return response.notFound({
        status: HttpCodes.NOT_FOUND,
        message: 'User not found',
      });
    }
    await DQ.delete();
    return response.ok({
      code: HttpCodes.SUCCESS,
      result: { message: 'User deleted successfully' },
    });
  }
}
