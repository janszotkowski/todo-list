import { InsertStore } from '@/stores/InsertStore.ts';
import { TodoInsertItem, TodoItemInsertSchema } from '@/dto/TodoItem.ts';
import { ZodType } from 'zod';

export class TodoItemInsertStore extends InsertStore<TodoInsertItem> {
    protected initValidationSchema(): ZodType<any, any, TodoInsertItem> {
        return TodoItemInsertSchema;
    }
}
