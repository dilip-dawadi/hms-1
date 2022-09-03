import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const effect = {
    theme: 'colored',
    autoClose: 4000,
}
export const NotifySuccess = (msg) => {
    toast.success(`${msg}`, effect);
};

export const NotifyError = (msg) => {
    toast.error(`${msg}`, effect);
};

export const NotifyWarning = (msg) => {
    toast.warning(`${msg}`, effect);
};

export const NotifyInfo = (msg) => {
    toast.info(`${msg}`, effect);
}