import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteImageColumn1691137062851 implements MigrationInterface {
	name = 'DeleteImageColumn1691137062851';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`product\` DROP COLUMN \`image\``,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`product\` ADD \`image\` varchar(255) NOT NULL`,
		);
	}
}
