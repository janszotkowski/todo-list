import * as React from 'react';
import {
    Button,
    DatePicker,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select, SelectedItems,
    SelectItem,
} from '@nextui-org/react';
import { TodoItemInsertStore } from '@/stores';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Priority } from '@/dto/Common.ts';
import { ChevronHighIcon, ChevronLowIcon, ChevronMediumIcon } from '@/components';

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
        console.log('xxx');
        store.reset();
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
                <ModalHeader className={'text-white flex flex-col gap-6'}>Vytvořit úkol</ModalHeader>
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

                    <div className={'flex gap-3'}>
                        <DatePicker
                            className={'max-w-[284px]'}
                            label={'Due date'}
                            onChange={() => {}}
                            size={'sm'}
                        />

                        <Select<any>
                            size={'sm'}
                            className={'max-w-xs'}
                            label={'Priority'}
                            isInvalid={!!validationState.get('priority')}
                            errorMessage={validationState.get('priority')?.message}
                            selectedKeys={[data.priority]}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => store.onInputChange('priority', event.target.value)}
                            renderValue={(items: SelectedItems<Priority>): React.ReactNode => {
                                return (
                                    <>
                                        {
                                            items.map(it => (
                                                <div className={'flex gap-2 items-center'} key={it.key}>
                                                    {it.key === Priority.LOW && <ChevronLowIcon/>}
                                                    {it.key === Priority.MEDIUM && <ChevronMediumIcon/>}
                                                    {it.key === Priority.HIGH && <ChevronHighIcon/>}
                                                    {t(`Priority.${it.key}`)}
                                                </div>
                                            ))
                                        }
                                    </>
                                );
                            }}
                            required
                        >
                            {Object.keys(Priority).map((p) => (
                                <SelectItem key={p}>
                                    <div className={'flex gap-2 items-center'}>
                                        {p === Priority.LOW && <ChevronLowIcon/>}
                                        {p === Priority.MEDIUM && <ChevronMediumIcon/>}
                                        {p === Priority.HIGH && <ChevronHighIcon/>}
                                        {t(`Priority.${p}`)}
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

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