import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Task, TaskDocument} from './schemas/task.schema';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {TaskResponseDto} from './dto/task-response.dto';
import {PaginationDto} from './dto/pagination.dto';
import {PaginatedTasksDto} from './dto/paginated-tasks.dto';

@Injectable()
export class TaskService {
	private readonly logger = new Logger(TaskService.name);

	constructor(
		@InjectModel(Task.name) private taskModel: Model<TaskDocument>
	) {
	}

	async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
		const createdTask = new this.taskModel(createTaskDto);
		const savedTask = await createdTask.save();
		return this.mapToResponseDto(savedTask);
	}

	async findAll(paginationDto: PaginationDto): Promise<PaginatedTasksDto> {
		const {page = 1, limit = 10} = paginationDto;
		const skip = (page - 1) * limit;

		const [tasks, total] = await Promise.all([
			this.taskModel.find().skip(skip).limit(limit).exec(),
			this.taskModel.countDocuments().exec()
		]);

		return {
			items: tasks.map(task => this.mapToResponseDto(task)),
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit)
		};
	}

	async findOne(id: string): Promise<TaskResponseDto> {
		const task = await this.taskModel.findById(id).exec();
		if (!task) {
			throw new NotFoundException(`Task with ID ${id} not found`);
		}
		return this.mapToResponseDto(task);
	}

	async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto> {
		const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {new: true}).exec();
		if (!task) {
			throw new NotFoundException(`Task with ID ${id} not found`);
		}
		return this.mapToResponseDto(task);
	}

	async remove(id: string): Promise<TaskResponseDto> {
		const task = await this.taskModel.findByIdAndDelete(id).exec();
		if (!task) {
			throw new NotFoundException(`Task with ID ${id} not found`);
		}
		return this.mapToResponseDto(task);
	}

	private mapToResponseDto(task: TaskDocument): TaskResponseDto {
		return {
			id: task._id as string,
			title: task.title,
			description: task.description,
			completed: task.completed,
			createdAt: task.createdAt,
			updatedAt: task.updatedAt
		};
	}
} 