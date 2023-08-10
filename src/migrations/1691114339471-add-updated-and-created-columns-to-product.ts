import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUpdatedAndCreatedColumnsToProduct1691114339471
	implements MigrationInterface
{
	name = 'AddUpdatedAndCreatedColumnsToProduct1691114339471';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`product\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`product\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`product\` DROP COLUMN \`updatedAt\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`product\` DROP COLUMN \`createdAt\``,
		);
	}
}
