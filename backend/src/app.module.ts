import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AppConfigModule } from './config/app-config.module';
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		AppConfigModule,
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (cfg: ConfigService) => ({
				uri: cfg.get<string>('database.mongodb.uri'),
			}),
			inject: [ConfigService],
		}),
		TaskModule,
	]
})
export class AppModule {
}
