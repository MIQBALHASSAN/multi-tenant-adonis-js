import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'companies';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('company_name').notNullable().index();
      table.string('phone').nullable();
      table.string('status').defaultTo('active').index();
      table.string('address').nullable();
      table.string('city').nullable();
      table.string('state').nullable();
      table.string('country').nullable();
      table.string('logo').nullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
