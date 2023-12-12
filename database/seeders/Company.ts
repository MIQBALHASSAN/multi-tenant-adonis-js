import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Company from 'App/Models/Company';

export default class extends BaseSeeder {
  public async run() {
    await Company.createMany([
      {
        company_name: 'company 1',
        db_name: '12345678901',
        phone: '12345678901',
        address: 'DHA Phase 5',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan',
        logo: '/uploads/company_logo/company_logo.jpg',
      },
      {
        company_name: 'company 2',
        db_name: '12345678902',
        phone: '12345678902',
        address: 'DHA Phase 5',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan',
        logo: '/uploads/company_logo/company_logo.jpg',
      },
      {
        company_name: 'company 3',
        db_name: '12345678903',
        phone: '12345678903',
        address: 'DHA Phase 5',
        city: 'Lahore',
        state: 'Punjab',
        country: 'Pakistan',
        logo: '/uploads/company_logo/company_logo.jpg',
      },
    ]);
  }
}
