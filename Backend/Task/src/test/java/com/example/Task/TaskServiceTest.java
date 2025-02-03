package com.example.Task;

import com.example.model.Task;
import com.example.repository.TaskRepository;
import com.example.service.TaskService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void testCreateTask() {
     
        Task task = new Task();
        task.setName("Task 1");
        task.setStatus("Pending");
        task.setCompleted(false);
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // Appel du service pour créer la tâche
        Task createdTask = taskService.createTask(task);

        // Vérifications
        assertNotNull(createdTask);
        assertEquals("Task 1", createdTask.getName());
        assertEquals("Pending", createdTask.getStatus());
        assertFalse(createdTask.isCompleted());
        assertNotNull(createdTask.getCreationDate());
        assertEquals(LocalDate.now(), createdTask.getCreationDate());

        // Vérifier que la méthode save a été appelée une fois
        verify(taskRepository, times(1)).save(task);
    }
}
