import { Exclude, Expose, Type } from 'class-transformer';
import { BaseTaskDto } from './base-task.dto';

@Exclude()
export class TaskResponseDto extends BaseTaskDto {
    @Expose()
    id: string;

    @Expose()
    @Type(() => Date)
    createdAt: Date;

    @Expose()
    @Type(() => Date)
    updatedAt: Date;
} 