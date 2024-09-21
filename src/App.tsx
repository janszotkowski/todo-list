import * as React from 'react';
import { Button, NextUIProvider, useDisclosure } from '@nextui-org/react';
import './styles/tailwind.scss';
import './App.scss';
import { TodoItemInsertView } from '@/views';

const App = (): React.ReactElement => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <NextUIProvider>
            <main className={'vMain dark text-foreground bg-background'}>
                <Button
                    color={'primary'}
                    onClick={onOpen}
                >
                    Click Me
                </Button>
                <TodoItemInsertView
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            </main>
        </NextUIProvider>
    );
};

export default App;
