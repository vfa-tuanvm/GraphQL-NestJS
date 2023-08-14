import { MigrationInterface, QueryRunner } from 'typeorm';

export class SocialAccountEntity1691997492733 implements MigrationInterface {
	name = 'SocialAccountEntity1691997492733';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`account\` (\`socialId\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`socialId\`, \`type\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_60328bf27019ff5498c4b977421\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_60328bf27019ff5498c4b977421\``,
		);
		await queryRunner.query(`DROP TABLE \`account\``);
	}
}
