import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FacebookService {
	constructor(private readonly httpService: HttpService) {}
}
