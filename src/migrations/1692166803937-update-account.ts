import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAccount1692166803937 implements MigrationInterface {
	name = 'UpdateAccount1692166803937';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`account\` DROP PRIMARY KEY`);
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD PRIMARY KEY (\`type\`)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`account\` DROP COLUMN \`socialId\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD \`socialId\` varchar(255) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE \`account\` DROP PRIMARY KEY`);
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD PRIMARY KEY (\`type\`, \`socialId\`)`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`account\` DROP PRIMARY KEY`);
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD PRIMARY KEY (\`type\`)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`account\` DROP COLUMN \`socialId\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD \`socialId\` int NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE \`account\` DROP PRIMARY KEY`);
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD PRIMARY KEY (\`socialId\`, \`type\`)`,
		);
	}
}
