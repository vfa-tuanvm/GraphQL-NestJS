import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [HttpModule],
	providers: [FacebookService],
})
export class FacebookModule {}
