import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../shared/shared.module'; 
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
  ],
  providers: [MessageService,TaskService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Validate login credentials
  validateLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/tasks']);
    } else {
      alert('Invalid credentials!');
    }
  }
}
