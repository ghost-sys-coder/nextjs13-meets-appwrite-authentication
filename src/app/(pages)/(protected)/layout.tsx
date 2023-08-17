"use client";

import React, { useState, useEffect } from "react";
import appwriteService from "@/appwrite/config";
import { AuthProvider } from "@/context/authContext";
import Blog from "@/components/Blog";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (!authStatus) {
        router.replace("/login");
        return <></>
    }
    
    return (
        children
    )
};

export default ProtectedLayout;