import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tasks', component: TaskComponent },
];
