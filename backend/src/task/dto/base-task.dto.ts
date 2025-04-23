import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class BaseTaskDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;
} 