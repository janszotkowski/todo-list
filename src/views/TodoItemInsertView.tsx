import * as React from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { TodoItemInsertStore } from '@/stores';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

type TodoItemInsertViewProps = {
    isOpen: boolean;
    onOpenChange: () => void;
};

const TodoItemInsertView: React.FC<TodoItemInsertViewProps> = observer((props: TodoItemInsertViewProps): React.ReactElement => {
    const store = React.useRef(new TodoItemInsertStore()).current;
    const {t} = useTranslation();
    const {data, validationState} = store;

    const onInsert = async (): Promise<void> => {
        const isValid = await store.validate();

        if (isValid) {
            await store.onInsert();
            store.reset();
            props.onOpenChange();
        }
    };

    const handleOpenChange = (): void => {
        if (!props.isOpen) {
            store.reset();
        }
        props.onOpenChange();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onOpenChange={handleOpenChange}
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
                        {t('Save')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

export { TodoItemInsertView };