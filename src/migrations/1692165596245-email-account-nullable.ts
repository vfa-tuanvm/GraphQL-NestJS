import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailAccountNullable1692165596245 implements MigrationInterface {
	name = 'EmailAccountNullable1692165596245';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`account\` CHANGE \`email\` \`email\` varchar(255) NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`account\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`,
		);
	}
}
