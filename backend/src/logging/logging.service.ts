import {Injectable, Inject} from '@nestjs/common';
import {ILogger} from './interfaces/logger.interface';

@Injectable()
export class LoggingService {
	constructor(
		@Inject('LOGGER') private readonly logger: ILogger
	) {
	}

	logOperation(operation: string, data: any): void {
		this.logger.log(operation, data);
	}

	logError(operation: string, error: Error): void {
		this.logger.error(operation, error);
	}

	onModuleDestroy(): void {
		if (this.logger.onModuleDestroy) {
			this.logger.onModuleDestroy();
		}
	}
}