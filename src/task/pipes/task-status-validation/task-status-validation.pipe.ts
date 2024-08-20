import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TaskService } from './../../task.service';
import { TaskStatus } from 'src/task/task-status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly taskStatus = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLEATE,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    if (value.status) {
      let status = value.status;
      status = String(status).toUpperCase();
      if (!this.filter(status)) {
        throw new BadRequestException(`"${value.status}" is an invalid status`);
      }
      value.status = status;
    }
     return value;
  }

  private filter(status: any) {
    const idx = this.taskStatus.indexOf(status);
    return idx !== -1;
  }
}
