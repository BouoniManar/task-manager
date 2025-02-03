import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SharedModule } from '../shared/shared.module';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    SharedModule
  ],
  providers: [MessageService, TaskService, ConfirmationService],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task = { id: 0, name: '', status: '', creationDate: '', completed: false };
  taskDialog: boolean = false;
  filters: any = {};

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        this.showToast('error', 'Error', 'Error loading tasks');
      }
    );
  }

  openTaskDialog(task?: Task) {
    this.selectedTask = task
      ? { ...task, status: task.completed ? 'Completed' : 'Pending' }
      : { id: 0, name: '', status: 'Pending', creationDate: '', completed: false };
    this.taskDialog = true;
  }

  saveTask() {

    this.selectedTask.status = this.selectedTask.completed ? 'Completed' : 'Pending';

    if (this.selectedTask.id) {
      this.taskService.updateTask(this.selectedTask).subscribe(
        (response) => {
          this.showToast('success', 'Task Updated', 'The task was updated successfully');
          this.loadTasks();
        },
        (error) => {
          this.showToast('error', 'Error', 'Error updating task');
        }
      );
    } else {
      this.taskService.createTask(this.selectedTask).subscribe(
        (response) => {
          this.showToast('success', 'Task Created', 'The task was created successfully');
          this.loadTasks();
        },
        (error) => {
          this.showToast('error', 'Error', 'Error creating task');
        }
      );
    }
    this.closeDialog();
  }

  toggleCompletion(task: Task) {
    task.completed = !task.completed;
    this.showToast(
      'info',
      'Task Status Changed',
      `The task has been marked as ${task.completed ? 'completed' : 'pending'}.`
    );
  }

  confirmDelete(task: Task) {
    this.selectedTask = task;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTask();
      }
    });
  }

  deleteTask() {
    if (this.selectedTask) {
      this.taskService.deleteTask(this.selectedTask.id).subscribe(
        () => {
          this.showToast('success', 'Task Deleted', 'The task was deleted successfully');
          this.loadTasks();
        },
        (error) => {
          this.showToast('error', 'Error', 'Error deleting task');
        }
      );
    }
  }

  closeDialog() {
    this.taskDialog = false;
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
