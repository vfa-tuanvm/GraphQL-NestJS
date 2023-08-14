import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueUsername1690948090229 implements MigrationInterface {
	name = 'UniqueUsername1690948090229';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD UNIQUE INDEX \`IDX_41dfcb70af895ddf9a53094515\` (\`username\`)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`account\` DROP INDEX \`IDX_41dfcb70af895ddf9a53094515\``,
		);
	}
}
