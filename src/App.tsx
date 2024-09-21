import * as React from 'react';
import { Button, NextUIProvider } from '@nextui-org/react';
import './styles/tailwind.scss';
import './App.scss';

const App = (): React.ReactElement => {
    return (
        <NextUIProvider>
            <main>
                ahoj
                <Button color={'primary'}>Click Me</Button>
            </main>
        </NextUIProvider>
    );
};

export default App;
