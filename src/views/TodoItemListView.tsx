import * as React from 'react';
import { observer } from 'mobx-react';
import { TodoItemListStore } from '@/stores';
import { Button, useDisclosure } from '@nextui-org/react';
import { TodoItemInsertView } from '@/views/TodoItemInsertView.tsx';
import { TodoItem } from '@/dto/TodoItem.ts';
import { useTranslation } from 'react-i18next';
import { PlusIcon } from '@/components';

const TodoItemListView: React.FC = observer((): React.ReactElement => {
    const store = React.useRef(new TodoItemListStore()).current;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {t} = useTranslation();

    React.useEffect(() => {
        store.loadData();
    }, [store]);

    const onCloseInsert = (): void => {
        onOpenChange();
        store.loadData();
    };

    return (
        <div>

            <h1>
                List
            </h1>

            {
                store.data.map((it: TodoItem) => (
                    <div key={it.id}>{it.title}</div>
                ))
            }

            <Button
                color={'primary'}
                onClick={onOpen}
                endContent={<PlusIcon/>}
            >
                {t('Add.new')}
            </Button>

            <TodoItemInsertView
                isOpen={isOpen}
                onOpenChange={onCloseInsert}
            />
        </div>
    );
});

export { TodoItemListView };