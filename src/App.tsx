import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { TodoItemListView } from '@/views';
import { useTranslation } from 'react-i18next';
import './i18n';
import './styles/tailwind.scss';

const App = (): React.ReactElement => {
    const {t, i18n} = useTranslation();

    if (!i18n.isInitialized) {
        return <div>Loading...</div>;
    }

    // React.useEffect(() => {
    //     const init = async (): Promise<void> => {
    //         const res = await databases.listDocuments(
    //             import.meta.env.PUBLIC_DATABASE_ID,
    //             import.meta.env.PUBLIC_COLLECTION_ID_TODOS
    //         )
    //
    //         console.log(res);
    //     };
    //
    //     init();
    // }, []);

    const changeLanguage = (lng: string): void => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <NextUIProvider>
            <main className={'w-screen h-screen dark text-foreground bg-background'}>
                <h1>{t('welcome')}</h1>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('cs')}>Čeština</button>

                <TodoItemListView />
            </main>
        </NextUIProvider>
    );
};

export default App;
