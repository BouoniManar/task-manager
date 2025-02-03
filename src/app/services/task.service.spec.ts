import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from '../model/task.model';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all tasks', () => {
    const mockTasks: Task[] = [
      { id: 1, name: 'Task 1', status: 'Pending', creationDate: '2023-01-01', completed: false },
      { id: 2, name: 'Task 2', status: 'Completed', creationDate: '2023-01-02', completed: true }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a new task', () => {
    const newTask: Task = { id: 0, name: 'New Task', status: 'Pending', creationDate: '2023-01-03', completed: false };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual({ ...newTask, id: 1 });
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newTask, id: 1 });
  });

  it('should update an existing task', () => {
    const updatedTask: Task = { id: 1, name: 'Updated Task', status: 'Pending', creationDate: '2023-01-01', completed: false };

    service.updateTask(updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    service.deleteTask(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
