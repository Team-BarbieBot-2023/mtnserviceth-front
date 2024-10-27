"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLine } from '@fortawesome/free-brands-svg-icons';

export default function Notification({ userId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getData = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/line/${id}`, {
                method: 'GET',
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch technician data: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            getData(userId);
        }
    }, [userId]);

    const handleRefresh = () => {
        if (userId) {
            getData(userId);
        }
    };

    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
            <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
                <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6 flex justify-between items-center">
                    <span>
                        <FontAwesomeIcon icon={faLine} className="h-10 w-10" /> Line Notification
                    </span>
                </div>
                <div className="text-center">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className={`text-lg font-medium p-6 rounded-lg shadow-md ${data?.line_id === null ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {data?.line_id === null ? (
                                <>
                                    <span className="block text-xl font-semibold mb-2">Verification Pending</span>
                                    <span className="text-sm">Please use the verification code below to complete the verification process:</span>
                                    <div className="text-6xl font-bold mt-2">{data.vardify_code}</div>
                                    <p className="text-2xl mt-10">How to verification !!!!</p>
                                    <div className="flex gap-3 text-center w-full mt-5">
                                        <div className="w-1/5">
                                            <img className="m-auto h-40 w-40" src="/assets/addline.png" alt="Add Line QR" />
                                        </div>
                                        <div className="text-left">
                                            <p className="mt-4 text-gray-600">1. Scan QR code to open chat.</p>
                                            <p className="mt-4 text-gray-600">2. Type code verify in chat and press send.</p>
                                            <p className="mt-4 text-gray-600">3. If there is a "Verification Code successfully" response message, <span className="text-green-600 cursor-pointer underline" onClick={handleRefresh}>Press Confirm.</span></p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="block text-xl font-semibold mb-2">Verification Successful</span>
                                    <span className="text-sm">Your code has been verified successfully!</span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
