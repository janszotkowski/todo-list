import { z } from 'zod';
import { LuxonDateSchema, Priority, Status } from './Common.ts';

const TodoItemBaseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1, {message: 'Title is required'}),
    description: z.string().optional(),
    completed: z.boolean(),
    dueDate: LuxonDateSchema.optional(),
    priority: z.nativeEnum(Priority),
    tags: z.array(z.string()).optional(),
    createdAt: LuxonDateSchema,
    updatedAt: LuxonDateSchema.optional(),
    completedAt: LuxonDateSchema.optional(),
    order: z.number().nonnegative(),
    status: z.nativeEnum(Status),
});

export const TodoItemInsertSchema = TodoItemBaseSchema;

export type TodoItem = z.infer<typeof TodoItemBaseSchema>;
export type TodoInsertItem = z.infer<typeof TodoItemInsertSchema>;
