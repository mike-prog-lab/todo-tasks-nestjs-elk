export interface ILogger {
	log(operation: string, data: any): void;

	error(operation: string, error: Error): void;

	onModuleDestroy?(): void;
} 