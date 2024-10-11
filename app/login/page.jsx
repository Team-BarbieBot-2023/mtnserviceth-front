"use client";
import React from 'react';

import { Button } from '@nextui-org/react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

function Page() {

    const router = useRouter();


    const { data: session } = useSession();

    if (session) {
        router.push('/');
    }

    return (
        <div className="h-screen w-full flex">
            <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans flex gap-2">
                        <FontAwesomeIcon icon={faScrewdriverWrench} className="h-10 w-10" />
                        MTN Service TH
                    </h1>
                    <p className="text-white mt-1">
                        If you want to find a repair technician, think of us. We provide various repair technician services.
                    </p>
                </div>
            </div>
            <div className="flex w-1/2 justify-center items-center bg-white h-screen">
                <div className="bg-gray-100 p-8 rounded-xl shadow-lg max-w-md text-center">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                    <Button onClick={() => signIn('google')} className="bg-gray-200 px-10 py-4" radius="full"
                        endContent={<img src="google.svg" className="h-6 w-6" alt="Google Icon" />}
                    >Continue with Google</Button>
                </div>
            </div>
        </div>
    );
}

export default Page;
