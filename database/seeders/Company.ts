import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Company from 'App/Models/Company';

export default class extends BaseSeeder {
  public async run() {
    await Company.createMany([
      {
        company_name: 'company 1',
        phone: '123456789',
        address: 'DHA Phase 5',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan',
        logo: '/uploads/company_logo/company_logo.jpg',
      },
      {
        company_name: 'company 2',
        phone: '123456789',
        address: 'DHA Phase 5',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan',
        logo: '/uploads/company_logo/company_logo.jpg',
      },
      {
        company_name: 'company 3',
        phone: '123456789',
        address: 'DHA Phase 5',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan',
        logo: '/uploads/company_logo/company_logo.jpg',
      },
    ]);
  }
}
