import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CompanyController from 'App/Controllers/Http/CompanyController';

Route.group(async () => {
  Route.post('/', (ctx: HttpContextContract) => {
    return new CompanyController().create(ctx);
  });
  Route.put('/:id', (ctx: HttpContextContract) => {
    return new CompanyController().update(ctx);
  });
  Route.delete('/:id', (ctx: HttpContextContract) => {
    return new CompanyController().delete(ctx);
  });
  Route.get('/', (ctx: HttpContextContract) => {
    return new CompanyController().findAllRecords(ctx);
  });
  Route.get('/:id', (ctx: HttpContextContract) => {
    return new CompanyController().findSingleRecord(ctx);
  });
}).prefix('/api/v1/company');
