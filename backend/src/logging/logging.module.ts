import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { ConsoleLogger } from './implementations/console.logger';
import { LogstashLogger } from './implementations/logstash.logger';
import { ConfigService } from "@nestjs/config";

export enum LoggerType {
    CONSOLE = 'console',
    LOGSTASH = 'logstash'
}

@Module({
    providers: [
        LoggingService,
        {
            provide: 'LOGGER',
            useFactory: (cfg: ConfigService) => {
                switch (cfg.get<string>('logger')) {
                    case LoggerType.LOGSTASH:
                        return new LogstashLogger();
                    default:
                        return new ConsoleLogger();
                }
            },
            inject: [ConfigService]
        },
        ConsoleLogger,
        LogstashLogger
    ],
    exports: [LoggingService]
})
export class LoggingModule {
}