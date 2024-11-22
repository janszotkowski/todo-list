import * as React from 'react';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { ColumnsData } from '@/dto/Common.ts';

type DataTableProps<T> = {
    data: T[];
    columns: ColumnsData[];
    enabledSelection: boolean;
};

const DataTable: React.FC<DataTableProps<unknown>> = <T, >(props: DataTableProps<T>): React.ReactElement => {
    return (
        <Table
            isHeaderSticky
            classNames={{
                base: 'max-h-[520px] overflow-scroll m-auto w-1/2',
            }}
            selectionMode={props.enabledSelection ? 'multiple' : undefined}
            selectionBehavior={'toggle'}
        >
            <TableHeader columns={props.columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === 'actions' ? 'center' : 'start'}
                        allowsSorting={column.sortable}
                    >
                        {column.title}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={props.data}>
                {(item: T) => (
                    <TableRow>
                        {(columnKey) => (
                            <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export { DataTable };