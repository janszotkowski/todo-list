import * as React from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { TodoItemInsertStore } from '@/stores';
import { observer } from 'mobx-react';

type TodoItemInsertViewProps = {
    isOpen: boolean;
    onOpenChange: () => void;
};

const TodoItemInsertView: React.FC<TodoItemInsertViewProps> = observer((props: TodoItemInsertViewProps): React.ReactElement => {
    const store = React.useRef(new TodoItemInsertStore()).current;
    const {data, validationState} = store;

    const onInsert = async (): Promise<void> => {
        await store.onInsert();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            placement={'top-center'}
            className={'dark'}
            isDismissable={false}
            size={'xl'}
        >
            <ModalContent>
                <ModalHeader className={'text-white flex flex-col gap-1'}>Vytvořit úkol</ModalHeader>
                <ModalBody>
                    <Input
                        label={'Název'}
                        size={'sm'}
                        value={data.title}
                        onValueChange={(value: string) => store.onInputChange('title', value)}
                        isInvalid={!!validationState.get('title')}
                        errorMessage={validationState.get('title')?.message}
                        autoFocus
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color={'success'}
                        onPress={onInsert}
                    >
                        Vytvořit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

export { TodoItemInsertView };