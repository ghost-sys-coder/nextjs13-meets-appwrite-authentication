"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/context/useAuth';
import appwriteService from '@/appwrite/config';

const LogoutPage = () => {
    const router = useRouter();
    const { setAuthStatus } = useAuth();

    useEffect(() => {
        appwriteService.logout()
            .then(() => {
                setAuthStatus(false);
                router.replace("/");
        })
    }, [])

    return (
        <>
        </>
    )

}

export default LogoutPage;
