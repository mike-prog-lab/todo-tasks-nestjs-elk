import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { LoggingService } from '../../logging/logging.service';
import * as mongoose from "mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: false })
    completed: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export function taskMiddleware(loggingService: LoggingService) {
    return (schema: mongoose.Schema) => {
        schema.post('save', function (doc: TaskDocument) {
            loggingService.logOperation('create', doc.toJSON());
        });

        schema.post('findOneAndUpdate', function (doc: TaskDocument) {
            if (doc) {
                loggingService.logOperation('update', doc.toJSON());
            }
        });

        schema.post('findOneAndDelete', function (doc: TaskDocument) {
            if (doc) {
                loggingService.logOperation('delete', doc.toJSON());
            }
        });

        schema.post('find', function (docs: TaskDocument[]) {
            if (docs && docs.length > 0) {
                loggingService.logOperation('retrieve', {
                    count: docs.length,
                    tasks: docs.map(doc => doc.toJSON())
                });
            }
        });
    };
} 