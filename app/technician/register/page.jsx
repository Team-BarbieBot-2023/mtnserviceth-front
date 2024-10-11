"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Input, Checkbox, Textarea, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
        phone: '',
        emergencyContact: '',
        nationalId: '',
        addressId: '',
        currentAddress: '',
        workHistory: '',
        agreeToCollect: false,
        documents: []
    });

    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.emergencyContact) newErrors.emergencyContact = "Emergency contact is required";
        if (!formData.nationalId) newErrors.nationalId = "National ID is required";
        if (!formData.addressId) newErrors.addressId = "Address (ID card) is required";
        if (!formData.currentAddress) newErrors.currentAddress = "Current address is required";
        if (!formData.workHistory) newErrors.workHistory = "Work history is required";
        if (!formData.agreeToCollect) newErrors.agreeToCollect = "You must agree to the PDPA consent";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('user_id', session.user._id);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address_id_card', formData.addressId);
        formDataToSend.append('current_address', formData.currentAddress);
        formDataToSend.append('emergency_contact', formData.emergencyContact);
        formDataToSend.append('national_id', formData.nationalId);
        formDataToSend.append('work_history', formData.workHistory);
        formDataToSend.append('pdpa_consent', formData.agreeToCollect ? 1 : 0);

        // Append documents only if they exist
        if (formData.documents.length > 0) {
            formDataToSend.append('documents', formData.documents[0]);
        }

        try {
            const response = await fetch('http://localhost:3001/technicians', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                router.push('/technician');
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
                    <h1 className="text-white font-bold text-4xl font-sans">MTN Service TH</h1>
                </div>
            </div>
            <div className="flex w-1/2 justify-center items-center bg-white h-screen">
                <div className="bg-gray-100 p-8 rounded-xl shadow-lg text-center max-w-2xl">
                    <h1 className="text-gray-800 font-bold text-2xl mb-3">Fill in personal information</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="text-left mb-1 grid grid-cols-3 gap-4">
                            <Input
                                name="phone"
                                label={<span>Phone <span className="text-red-500">*</span></span>}
                                placeholder="Enter your phone number"
                                fullWidth
                                onChange={handleInputChange}
                                helperText={errors.phone && errors.phone}
                                helperColor="error"
                                status={errors.phone ? 'error' : 'default'} // ใช้สำหรับ border สีแดง
                            />
                            <Input
                                name="emergencyContact"
                                label={<span>Emergency Contact <span className="text-red-500">*</span></span>}
                                placeholder="Enter emergency contact"
                                fullWidth
                                onChange={handleInputChange}
                                helperText={errors.emergencyContact && errors.emergencyContact}
                                helperColor="error"
                                status={errors.emergencyContact ? 'error' : 'default'}
                            />
                            <Input
                                name="nationalId"
                                label={<span>National ID <span className="text-red-500">*</span></span>}
                                placeholder="Enter your national ID"
                                fullWidth
                                onChange={handleInputChange}
                                helperText={errors.nationalId && errors.nationalId}
                                helperColor="error"
                                status={errors.nationalId ? 'error' : 'default'}
                            />
                            <Textarea
                                name="addressId"
                                label={<span>Address (ID Card) <span className="text-red-500">*</span></span>}
                                placeholder="Enter address on ID card"
                                fullWidth
                                onChange={handleInputChange}
                                helperText={errors.addressId && errors.addressId}
                                helperColor="error"
                                status={errors.addressId ? 'error' : 'default'}
                                className="col-span-3"
                            />
                            <Textarea
                                name="currentAddress"
                                label={<span>Current Address <span className="text-red-500">*</span></span>}
                                placeholder="Enter your current address"
                                fullWidth
                                onChange={handleInputChange}
                                helperText={errors.currentAddress && errors.currentAddress}
                                helperColor="error"
                                status={errors.currentAddress ? 'error' : 'default'}
                                className="col-span-3"
                            />
                            <Textarea
                                name="workHistory"
                                label={<span>Work History<span className="text-red-500">*</span></span>}
                                placeholder="Enter your work history"
                                fullWidth
                                onChange={handleInputChange}
                                helperText={errors.workHistory && errors.workHistory}
                                helperColor="error"
                                status={errors.workHistory ? 'error' : 'default'}
                                className="col-span-3"
                            />
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
                                    <p className='text-sm'>
                                        The company asks for consent to collect your personal information, including first name, last name, email address, and telephone number.
                                    </p>
                                </Checkbox>
                            </div>
                        </div>
                        <Button shadow color="primary" auto type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
