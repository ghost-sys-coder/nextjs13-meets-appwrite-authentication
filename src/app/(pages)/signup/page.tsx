"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import Signup from "@/components/Signup";

const SignupPage = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/profile");
        return <></>;
    }

    return (
        <section className="px-4 py-10 sm:px-6 sm:py-16">
            <Signup />
        </section>
    )

}

export default SignupPage;
