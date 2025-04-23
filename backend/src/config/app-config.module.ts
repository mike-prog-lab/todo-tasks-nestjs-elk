import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import configuration from '../../configuration/index';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			validationSchema: Joi.object({
				LOGGER: Joi.string().valid('console', 'logstash').default('console'),
				PORT: Joi.number().default(3000),
				MONGODB_URI: Joi.string().default('mongodb://localhost:27017/your-database'),
				ELASTICSEARCH_NODE: Joi.string().default('http://localhost:9200'),
				JWT_SECRET: Joi.string().required(),
				JWT_EXPIRES_IN: Joi.string().default('1d'),
				LOGSTASH_HOST: Joi.string().default('localhost'),
				LOGSTASH_PORT: Joi.number().default(5000),
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test')
					.default('development'),
			}),
		}),
	],
})
export class AppConfigModule {
}