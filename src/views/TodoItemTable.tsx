import * as React from 'react';
import { TodoItem } from '@/dto/TodoItem.ts';
import { DataTable } from '@/components';
import { ColumnsData } from '@/dto/Common.ts';
import { useTranslation } from 'react-i18next';

type TodoItemTableProps = {
    data: TodoItem[];
};

const TodoItemTable: React.FC<TodoItemTableProps> = React.memo((props: TodoItemTableProps): React.ReactElement => {
    const {t} = useTranslation();

    const columns: ColumnsData[] = React.useMemo(() => {
        return [
            {
                title: t('Title'),
                uid: 'title',
                sortable: true,
            },
            {
                title: t('Status'),
                uid: 'status',
            },
        ];
    }, [t]);

    return (
        <DataTable
            data={props.data}
            columns={columns}
            enabledSelection
        />
    );
});

export { TodoItemTable };