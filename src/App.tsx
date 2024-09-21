import * as React from 'react';
import { Button, NextUIProvider, useDisclosure } from '@nextui-org/react';
import { TodoItemInsertView } from '@/views';
import { useTranslation } from 'react-i18next';
import './i18n';
import './styles/tailwind.scss';
import './App.scss';

const App = (): React.ReactElement => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {t, i18n} = useTranslation();

    if (!i18n.isInitialized) {
        return <div>Loading...</div>;
    }

    const changeLanguage = (lng: string): void => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <NextUIProvider>
            <main className={'vMain dark text-foreground bg-background'}>
                <h1>{t('welcome')}</h1>
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
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('cs')}>Čeština</button>
            </main>
        </NextUIProvider>
    );
};

export default App;
