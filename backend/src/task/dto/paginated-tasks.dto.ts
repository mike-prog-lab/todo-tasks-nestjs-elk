import { TaskResponseDto } from './task-response.dto';

export class PaginatedTasksDto {
    items: TaskResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
} 