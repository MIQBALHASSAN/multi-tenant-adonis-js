import Env from '@ioc:Adonis/Core/Env';
import Logger from '@ioc:Adonis/Core/Logger';
import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Migrator from '@ioc:Adonis/Lucid/Migrator';
import Config from '@ioc:Adonis/Core/Config';
import Company from 'App/Models/Company';

export default {
  async generateTenantDB(database: string) {
    const tenant = await Company.query().where('db_name', database).first();
    if (!tenant) {
      Logger.error(`No tenant found for this ${database}.`);
      return;
    } else {
      if (tenant) {
        await Database.rawQuery(`CREATE DATABASE ${tenant.db_name};`);
        Logger.info(`Database ${tenant.db_name} created successfully`);
      }
      /*
       * Migrate single tenant databases
       * */
      await Database.manager.close('tenant');
      Config.set(
        'database.connections.tenant.connection.database',
        tenant.db_name
      );
      Database.manager.connect('tenant');
      const migrator = new Migrator(Database, Application, {
        direction: 'up',
        dryRun: false,
        connectionName: 'tenant',
      });
      await migrator.run();
      Logger.info(
        `[Tenant ==> ${tenant.company_name}] migrations are migrated successfully in database ==> [${tenant.db_name}]`
      );
      for (const migratedFile in migrator.migratedFiles) {
        const status =
          migrator.migratedFiles[migratedFile].status === 'completed'
            ? 'migrated'
            : migrator.migratedFiles[migratedFile].status;
        Logger.info(
          `[${status}] ==> [${migrator.migratedFiles[migratedFile].file.name}]`
        );
      }
    }
  },

  setTenantDB(database: string) {
    Database.manager.patch('tenant', {
      client: 'mysql2',
      connection: {
        host: Env.get('MYSQL_HOST'),
        port: Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: database,
      },
      pool: {
        min: 1,
        max: 1,
      },
    });
  },
};
