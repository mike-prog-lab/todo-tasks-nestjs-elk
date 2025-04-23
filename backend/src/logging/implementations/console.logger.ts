import {Injectable, Logger} from '@nestjs/common';
import {ILogger} from '../interfaces/logger.interface';

@Injectable()
export class ConsoleLogger implements ILogger {
	private readonly logger = new Logger(ConsoleLogger.name);

	log(operation: string, data: any): void {
		const logEntry = {
			timestamp: new Date().toISOString(),
			operation,
			data,
			service: 'todo-service',
			level: 'info'
		};

		this.logger.log(JSON.stringify(logEntry));
	}

	error(operation: string, error: Error): void {
		const logEntry = {
			timestamp: new Date().toISOString(),
			operation,
			error: {
				message: error.message,
				stack: error.stack
			},
			service: 'todo-service',
			level: 'error'
		};

		this.logger.error(JSON.stringify(logEntry));
	}
} 