import { TodoItem } from '@/dto/TodoItem.ts';
import { ListStore } from '@/stores/ListStore.ts';
import { ApiService } from '@/api/ApiService.ts';
import { todoService } from '@/api/TodoService.ts';

export class TodoItemListStore extends ListStore<TodoItem> {
    protected getService(): ApiService<TodoItem> {
        return todoService;
    }
}
