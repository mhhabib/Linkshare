// ToastNotifications.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotifications = () => {
    return <ToastContainer />;
};

export const showSuccessToast = (message) => {
    toast.success(message);
};

export const showErrorToast = (message) => {
    toast.error(message);
};

export default ToastNotifications;
