"use client";

import { Button } from '@nextui-org/react';
import { useSession, signIn, signOut } from "next-auth/react";
import React from 'react';

function Page() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <div className="h-screen flex justify-center items-center bg-gray-50">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Signed in as {session.user.email}</h1>
                        <Button onClick={() => signOut()} color="error">Sign out</Button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="h-screen flex">
            <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans flex gap-2">
                        <img src="mtn-icon.svg" className="h-10 w-10" alt="MTN Icon" />
                        MTN Service TH
                    </h1>
                    <p className="text-white mt-1">
                        If you want to find a repair technician, think of us. We provide various repair technician services.
                    </p>
                </div>
            </div>
            <div className="flex w-1/2 justify-center items-center bg-white">
                <form className="bg-white">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                    <Button
                        onClick={() => signIn('google')}
                        className="bg-gray-200 px-10 py-4"
                        radius="full"
                        endContent={<img src="google.svg" className="h-6 w-6" alt="Google Icon" />}
                    >
                        Continue with Google
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Page;
