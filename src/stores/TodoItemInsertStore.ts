import { InsertStore } from '@/stores/InsertStore.ts';
import { TodoInsertItem, TodoItemInsertSchema } from '@/dto/TodoItem.ts';
import { ZodType } from 'zod';
import { DateTime } from 'luxon';
import { Priority, Status } from '@/dto/Common.ts';
import { v4 as uuidv4 } from 'uuid';
import { ApiService } from '@/api/ApiService.ts';
import { todoService } from '@/api/TodoService.ts';

export class TodoItemInsertStore extends InsertStore<TodoInsertItem> {
    public constructor() {
        super();
    }

    protected initValidationSchema(): ZodType<any, any, TodoInsertItem> {
        return TodoItemInsertSchema;
    }

    protected getService(): ApiService<TodoInsertItem> {
        return todoService;
    }

    protected getInitData(): TodoInsertItem {
        return {
            tags: [],
            completed: false,
            createdAt: DateTime.now().toUTC().toISO(),
            id: uuidv4(),
            order: 0,
            priority: Priority.MEDIUM,
            status: Status.IN_PROGRESS,
            title: '',
        };
    }
}
