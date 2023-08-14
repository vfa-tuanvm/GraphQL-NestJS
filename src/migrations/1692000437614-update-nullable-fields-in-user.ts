import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNullableFieldsInUser1692000437614
	implements MigrationInterface
{
	name = 'UpdateNullableFieldsInUser1692000437614';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`fullName\` \`fullName\` varchar(255) NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` CHANGE \`fullName\` \`fullName\` varchar(255) NOT NULL`,
		);
	}
}
