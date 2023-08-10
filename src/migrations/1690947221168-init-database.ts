import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1690947221168 implements MigrationInterface {
	name = 'InitDatabase1690947221168';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(20) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`description\` mediumtext NOT NULL, \`image\` varchar(255) NOT NULL, \`categoryId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``,
		);
		await queryRunner.query(`DROP TABLE \`category\``);
		await queryRunner.query(`DROP TABLE \`product\``);
		await queryRunner.query(`DROP TABLE \`account\``);
	}
}
