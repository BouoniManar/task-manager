package com.example.Task;


import com.example.controller.TaskController;
import com.example.model.Task;
import com.example.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Optional;

public class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        // Initialisation de Mockito et du MockMvc
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(taskController).build();
    }

    @Test
    public void testGetAllTasks() throws Exception {
        // Création de données fictives
        Task task1 = new Task();
        task1.setId(1L);
        task1.setName("Task 1");
        task1.setStatus("New");

        Task task2 = new Task();
        task2.setId(2L);
        task2.setName("Task 2");
        task2.setStatus("In Progress");

        // Mock du service
        when(taskService.getAllTasks()).thenReturn(Arrays.asList(task1, task2));

        // Test de l'endpoint GET /tasks
        mockMvc.perform(get("/tasks"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$[0].name").value("Task 1"))
               .andExpect(jsonPath("$[1].name").value("Task 2"));

        verify(taskService, times(1)).getAllTasks();
    }

    @Test
    public void testGetTaskById() throws Exception {
        // Création de données fictives
        Task task = new Task();
        task.setId(1L);
        task.setName("Task 1");

        when(taskService.getTaskById(1L)).thenReturn(Optional.of(task));

        // Test de l'endpoint GET /tasks/{id}
        mockMvc.perform(get("/tasks/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.name").value("Task 1"));

        verify(taskService, times(1)).getTaskById(1L);
    }

    @Test
    public void testCreateTask() throws Exception {
        Task task = new Task();
        task.setName("New Task");
        task.setStatus("New");

        // Mock du service
        when(taskService.createTask(any(Task.class))).thenReturn(task);

        // Test de l'endpoint POST /tasks
        mockMvc.perform(post("/tasks")
                .contentType("application/json")
                .content("{\"name\": \"New Task\", \"status\": \"New\"}"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.name").value("New Task"));

        verify(taskService, times(1)).createTask(any(Task.class));
    }

    @Test
    public void testUpdateTask() throws Exception {
        Task task = new Task();
        task.setId(1L);
        task.setName("Updated Task");

        // Mock du service
        when(taskService.updateTask(eq(1L), any(Task.class))).thenReturn(task);

        // Test de l'endpoint PUT /tasks/{id}
        mockMvc.perform(put("/tasks/1")
                .contentType("application/json")
                .content("{\"name\": \"Updated Task\"}"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.name").value("Updated Task"));

        verify(taskService, times(1)).updateTask(eq(1L), any(Task.class));
    }

    @Test
    public void testDeleteTask() throws Exception {
        // Test de l'endpoint DELETE /tasks/{id}
        mockMvc.perform(delete("/tasks/1"))
               .andExpect(status().isNoContent());

        // Vérification que la méthode deleteTask a été appelée
        verify(taskService, times(1)).deleteTask(1L);
    }
}

