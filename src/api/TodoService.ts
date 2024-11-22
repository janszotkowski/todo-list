import { ApiService } from '@/api/ApiService.ts';
import { TodoItem, TodoItemBaseSchema } from '@/dto/TodoItem.ts';

class TodoService extends ApiService<TodoItem> {
    protected storageKey = 'todoList';
    protected schema = TodoItemBaseSchema;
}

export const todoService = new TodoService();
