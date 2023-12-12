import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'rooms';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('hotel_id')
        .unsigned()
        .references('hotels.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('status').notNullable().defaultTo('active');
      table.string('room_type').notNullable();
      table.string('room_no').notNullable();
      table.string('floor_no').notNullable();
      table.string('price_type').notNullable();
      table.string('purchase_price').notNullable();
      table.string('sale_price').notNullable();
      table.integer('no_of_bed').notNullable();

      table.unique(['hotel_id', 'room_no']);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
