import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteColoumnToAccount1692332489126
	implements MigrationInterface
{
	name = 'AddDeleteColoumnToAccount1692332489126';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD \`deletedAt\` varchar(255) NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`account\` DROP COLUMN \`deletedAt\``,
		);
	}
}
