import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    await new seeder.default(this.client).run();
  }
  public async run() {
    await this.runSeeder(await import('../Company'));
    await this.runSeeder(await import('../User'));
  }
}
