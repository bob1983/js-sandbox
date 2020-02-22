import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(new ValidationPipe()) filterDTO: GetTasksFilterDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO)
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', new TaskStatusValidationPipe()) status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task {
    return this.tasksService.deleteTask(id)
  }
}
