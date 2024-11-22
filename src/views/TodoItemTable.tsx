import * as React from 'react';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { TodoItem } from '@/dto/TodoItem.ts';

type TodoItemTableProps = {
    data: TodoItem[];
};

const TodoItemTable: React.FC<TodoItemTableProps> = (props: TodoItemTableProps): React.ReactElement => {
    return (
        <div>
            <Table
                isHeaderSticky
                classNames={{
                    base: 'max-h-[520px] overflow-scroll m-auto w-1/2',
                    table: 'min-h-[400px]',
                }}
            >
                <TableHeader>
                    <TableColumn key={'title'}>Title</TableColumn>
                </TableHeader>
                <TableBody items={props.data}>
                    {(item: TodoItem) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export { TodoItemTable };