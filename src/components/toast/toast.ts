import { Bounce, Id, toast, ToastOptions } from 'react-toastify';

const options: ToastOptions = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
} as const;

export const success = (message: string): Id => {
    return toast.success(message, options);
};

export const error = (message: string): Id => {
    return toast.error(message, options);
};