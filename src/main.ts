import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/services/auth.interceptor';
import { MessageService } from 'primeng/api'; // Import MessageService
import { appRoutes } from './app/app.routes';
import { SharedModule } from './app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService,
    SharedModule,
    NoopAnimationsModule,
    FormsModule,
  ],
});
