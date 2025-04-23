import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedTasksDto } from './dto/paginated-tasks.dto';

@Controller('tasks')
export class TaskController {
    private readonly logger = new Logger(TaskController.name);

    constructor(private readonly taskService: TaskService) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
        return this.taskService.create(createTaskDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedTasksDto> {
        return this.taskService.findAll(paginationDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<TaskResponseDto> {
        return this.taskService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<TaskResponseDto> {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<TaskResponseDto> {
        return this.taskService.remove(id);
    }
} 