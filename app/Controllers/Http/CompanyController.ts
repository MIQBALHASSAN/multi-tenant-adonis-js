import { BaseController } from 'App/Controllers/BaseController';
import Company from 'App/Models/Company';
import HttpCodes from 'App/Enums/HttpCodes';

export default class CompanyController extends BaseController {
  public MODEL: typeof Company;

  constructor() {
    super();
    this.MODEL = Company;
  }

  // find companies list
  public async findAllRecords({ request, response }) {
    let DQ = this.MODEL.query();

    const page = request.input('page');
    const pageSize = request.input('pageSize');

    if (!DQ) {
      return response.notFound({
        code: HttpCodes.NOT_FOUND,
        message: 'Company Not Found',
      });
    }

    if (pageSize) {
      return response.ok({
        code: HttpCodes.SUCCESS,
        result: await DQ.paginate(page, pageSize),
        message: 'Companies find Successfully',
      });
    } else {
      return response.ok({
        code: HttpCodes.SUCCESS,
        result: await DQ.select('*'),
        message: 'Companies find Successfully',
      });
    }
  }

  // find company using id
  public async findSingleRecord({ request, response }) {
    try {
      const DQ = await this.MODEL.query()
        .where('id', request.param('id'))
        .first();

      if (!DQ) {
        return response.notFound({
          code: HttpCodes.NOT_FOUND,
          message: 'Company does not exists!',
        });
      }

      return response.ok({
        code: HttpCodes.SUCCESS,
        message: 'Company Find Successfully',
        result: DQ,
      });
    } catch (e) {
      return response.internalServerError({
        code: HttpCodes.SERVER_ERROR,
        message: e.toString(),
      });
    }
  }

  // create new company
  public async create({ request, response }) {
    try {
      const DE = await this.MODEL.findBy(
        'company_name',
        request.body().company_name
      );

      if (DE) {
        return response.conflict({
          code: HttpCodes.CONFLICTS,
          message: `Company: "${request.body().company_name}" already exists!`,
        });
      }
      const DM = new this.MODEL();
      DM.company_name = request.body().company_name;
      DM.phone = request.body().phone;
      DM.status = request.body().status;
      DM.address = request.body().address;
      DM.city = request.body().city;
      DM.state = request.body().state;
      DM.country = request.body().country;
      DM.logo = request.body().logo;

      const DQ = await DM.save();

      return response.ok({
        code: HttpCodes.SUCCESS,
        message: `Company Created Successfully!`,
        result: DQ,
      });
    } catch (e) {
      console.log(e);
      return response.internalServerError({
        code: HttpCodes.SERVER_ERROR,
        message: e.toString(),
      });
    }
  }

  public async update({ request, response }) {
    try {
      const DQ = await this.MODEL.findBy('id', request.param('id'));

      if (!DQ) {
        return response.notFound({
          code: HttpCodes.NOT_FOUND,
          message: 'Company does not exists!',
        });
      }

      DQ.company_name = request.body().company_name;
      DQ.phone = request.body().phone;
      DQ.status = request.body().status;
      DQ.address = request.body().address;
      DQ.city = request.body().city;
      DQ.state = request.body().state;
      DQ.country = request.body().country;
      DQ.logo = request.body().logo;

      await DQ.save();

      return response.ok({
        code: HttpCodes.SUCCESS,
        message: 'Company Updated Successfully!',
        result: DQ,
      });
    } catch (e) {
      return response
        .status(HttpCodes.SERVER_ERROR)
        .send({ status: false, message: e.message });
    }
  }

  public async delete({ request, response }) {
    const DQ = await this.MODEL.findBy('id', request.param('id'));

    if (!DQ) {
      return response.notFound({ message: 'company not found' });
    }

    await DQ.delete();

    return response.ok({
      code: HttpCodes.SUCCESS,
      result: { message: 'company deleted successfully.' },
    });
  }
}
