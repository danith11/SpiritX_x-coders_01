"use client"

import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

const ConfirmationDialog = ({show, onClose}) => {
    const router = useRouter();
    useEffect(() => {
        if (show) setTimeout(() => router.push('/login'), 2000);
    }, [show]);
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded">Signup successful! Redirecting...</div>
        </div>
    );
}

export default ConfirmationDialog;