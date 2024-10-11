"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

function Page() {
    const router = useRouter();
    const { data: session, status, update } = useSession();
    const [role, setRole] = useState('U');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        const response = await fetch('http://localhost:3001/users/role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: role,
                session: session?.user
            }),
        })

        if (response.ok) {
            const data = await response.json();
            const userRole = data.role;
            await update({ role: userRole });

            switch (userRole) {
                case "A":
                    window.location = `${process.env.NEXT_PUBLIC_BASE_URL}/admin`;
                    break;
                case "T":
                    window.location = `${process.env.NEXT_PUBLIC_BASE_URL}/technician/register`;
                    break;
                default:
                    window.location = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
            }
        }
        setLoading(false);
    };

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
                    <img alt="User Avatar" className="object-cover rounded-full w-24 h-24 mx-auto mb-4" src={session?.user?.image} />

                    <h1 className="text-gray-800 font-bold text-2xl mb-3">Please choose your role.</h1>
                    <p className="text-sm font-normal text-gray-600 mb-5">
                        This role determines your access rights to various functions in the system.
                    </p>
                    <div className="text-left mb-6">
                        <div className="flex items-center mb-4">
                            <input id="T" name="role" type="radio" value="T" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                onChange={() => setRole('T')} checked={role === 'T'}
                            />
                            <label htmlFor="T" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                                <p>Technician</p>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input id="U" name="role" type="radio" value="U" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                onChange={() => setRole('U')} checked={role === 'U'}
                            />
                            <label htmlFor="U" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                                <p>User</p>
                            </label>
                        </div>
                    </div>

                    <Button onClick={handleSubmit} disabled={loading} className="bg-gray-200 px-10 py-4" radius="full">
                        {loading ? 'กำลังโหลด...' : 'ยืนยัน'}
                    </Button>

                </div>
            </div>
        </div>
    );
}

export default Page;
