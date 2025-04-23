import {Injectable, Logger} from '@nestjs/common';
import {Socket} from 'net';
import {ILogger} from '../interfaces/logger.interface';

@Injectable()
export class LogstashLogger implements ILogger {
	private readonly logger = new Logger(LogstashLogger.name);
	private readonly logstashClient: Socket;

	constructor() {
		this.logstashClient = new Socket();
		this.logstashClient.connect(5000, 'logstash');
	}

	log(operation: string, data: any): void {
		const logEntry = {
			timestamp: new Date().toISOString(),
			operation,
			data,
			service: 'todo-service',
			level: 'info'
		};

		this.logger.log(JSON.stringify(logEntry));
		this.logstashClient.write(JSON.stringify(logEntry) + '\n');
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
		this.logstashClient.write(JSON.stringify(logEntry) + '\n');
	}

	onModuleDestroy(): void {
		this.logstashClient.end();
	}
}