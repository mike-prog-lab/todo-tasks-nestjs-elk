import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task, TaskSchema, taskMiddleware } from './schemas/task.schema';
import { LoggingModule } from '../logging/logging.module';
import { LoggingService } from '../logging/logging.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Task.name,
                useFactory: (loggingService: LoggingService) => {
                    const schema = TaskSchema;
                    schema.plugin(taskMiddleware(loggingService));
                    return schema;
                },
                imports: [LoggingModule],
                inject: [LoggingService]
            }
        ]),
        LoggingModule
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule { } 