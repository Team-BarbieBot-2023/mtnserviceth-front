"use client";
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { Input, Checkbox, Textarea, Select, Button, SelectItem } from '@nextui-org/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation';

export default function Page() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: '',
        userId: '',
        phone: '',
        addressId: '',
        currentAddress: '',
        emergencyContact: '',
        nationalId: '',
        workHistory: '',
        agreeToCollect: false,
        documents: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            agreeToCollect: e.target.checked,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            documents: e.target.files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('user_id', session.user._id);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address_id_card', formData.addressId);
        formDataToSend.append('current_address', formData.currentAddress);
        formDataToSend.append('emergency_contact', formData.emergencyContact);
        formDataToSend.append('national_id', formData.nationalId);
        formDataToSend.append('work_history', formData.workHistory);
        formDataToSend.append('pdpa_consent', formData.agreeToCollect ? 1 : 0);


        if (formData.documents.length > 0) {
            formDataToSend.append('documents', formData.documents[0]);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/technicians`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                router.push('/');
            } else {
                alert('Failed to submit the form.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    if (!session) {
        return null;
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
                <div className="bg-gray-100 p-8 rounded-xl shadow-lg text-center max-w-2xl">
                    <img alt="User Avatar" className="object-cover rounded-full w-24 h-24 mx-auto mb-3" src={session?.user?.image} />

                    <p className="text-sm font-normal text-green-500">{session?.user?.name}</p>
                    <h1 className="text-gray-800 font-bold text-2xl mb-3">Fill in personal information</h1>
                    <p className="text-sm font-normal text-gray-600 mb-5">Please provide your personal details below.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="text-left mb-1 grid grid-cols-3 gap-4">
                            <Input name="phone" label="Phone" placeholder="Enter your phone number" fullWidth onChange={handleInputChange} />
                            <Input name="emergencyContact" label="Emergency Contact" placeholder="Enter emergency contact" fullWidth onChange={handleInputChange} />
                            <Input name="nationalId" label="National ID" placeholder="Enter your national ID" fullWidth onChange={handleInputChange} />
                            <Textarea name="addressId" label="Address (ID Card)" placeholder="Enter address on ID card" fullWidth className="col-span-3" onChange={handleInputChange} />
                            <Textarea name="currentAddress" label="Current Address" placeholder="Enter your current address" fullWidth className="col-span-3" onChange={handleInputChange} />
                            <Textarea name="workHistory" label="Work History" placeholder="Enter your work history" fullWidth className="col-span-3" onChange={handleInputChange} />
                            <div className="col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Upload Documents</label>
                                <input
                                    type="file"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="col-span-3">
                                <Checkbox color="primary" className='items-start' defaultSelected={false} onChange={handleCheckboxChange}>
                                    <p className='text-sm'>The company asks for consent to collect your personal information, including first name, last name, email address, and telephone number. To be used to send news, promotions and special offers from the company. If you agree, please click "Agree" or if you do not agree.</p>
                                </Checkbox>
                            </div>
                        </div>
                        <Button shadow color="primary" auto type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
