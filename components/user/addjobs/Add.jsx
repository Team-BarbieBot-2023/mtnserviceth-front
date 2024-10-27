import { ModalBody, ModalHeader, Input, Textarea, ModalFooter, Button, Select, DatePicker, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import React, { useState } from 'react';

export default function Add({ onClose }) {
    const { data: session } = useSession();
    const [valueDate, setValueDate] = React.useState(parseDate("2024-04-04"));
    const [formData, setFormData] = useState({
        phone: '',
        job_title: '',
        job_type: 'ซ่อม',
        scheduled_datetime: '',
        urgency: 'ปกติ',
        job_description: '',
        customer_details: {
            house_number: '',
            street: '',
            subdistrict: '',
            district: '',
            province: '',
            landmark: ''
        },
        img_description: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.customer_details) {
            setFormData((prevState) => ({
                ...prevState,
                customer_details: {
                    ...prevState.customer_details,
                    [name]: value
                }
            }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));
        setFormData((prevState) => ({
            ...prevState,
            img_description: [...prevState.img_description, ...newFiles]
        }));
    };

    const handleSelectionChangeUrgency = (e) => {
        switch (e.target.value) {
            case "urgent":
                formData.urgency = "ด่วน"
                break;
            case "normal":
                formData.urgency = "ปกติ"
                break;
            case "not_urgent":
                formData.urgency = "ไม่รีบ"
                break;
        }
    };

    const handleSelectionChangeJobType = (e) => {
        switch (e.target.value) {
            case "repair":
                formData.job_type = "ซ่อม"
                break;
            case "install":
                formData.job_type = "ติดตั้ง"
                break;
            case "upgrade":
                formData.job_type = "ปรับปรุง"
                break;
        }
    };

    const handleRemoveImage = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            img_description: prevState.img_description.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        formData.scheduled_datetime = valueDate;
        if (!formData.phone || !formData.job_title || !formData.job_description || !formData.scheduled_datetime || !formData.urgency) {
            alert('Please fill in all required fields.');
            return;
        }

        const customerDetails = { ...formData.customer_details };
        const imgDescription = formData.img_description.map(({ file }) => file.name);

        const data = new FormData();
        data.append('user_id', session.user._id);
        data.append('phone', formData.phone);
        data.append('job_title', formData.job_title);
        data.append('job_type', formData.job_type);
        data.append('scheduled_datetime', formData.scheduled_datetime);
        data.append('urgency', formData.urgency);
        data.append('job_description', formData.job_description);
        data.append('customer_details', JSON.stringify(customerDetails));
        data.append('img_description', JSON.stringify(imgDescription));

        formData.img_description.forEach(({ file }) => {
            data.append('documents', file);
        });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs`, {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                onClose();
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
        <>
            <ModalHeader className="flex flex-col gap-1">
                Problem information that needs to be added
            </ModalHeader>
            <ModalBody>
                <div className="flex gap-5">
                    <form className="w-1/2 grid grid-cols-2 gap-4">
                        <Input
                            isRequired
                            name="phone"
                            label="Phone"
                            placeholder="Enter phone number"
                            fullWidth
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            name="job_title"
                            label="Job Title"
                            placeholder="Enter job title"
                            fullWidth
                            onChange={handleChange}
                        />
                        <Select
                            isRequired
                            label="Job Type"
                            placeholder="Select job type"
                            onChange={handleSelectionChangeJobType}
                            defaultSelectedKeys={["repair"]}
                        >
                            <SelectItem key="repair" value="ซ่อม">
                                ซ่อม
                            </SelectItem>
                            <SelectItem key="install" value="ติดตั้ง">
                                ติดตั้ง
                            </SelectItem>
                            <SelectItem key="upgrade" value="ปรับปรุง">
                                ปรับปรุง
                            </SelectItem>
                        </Select>

                        <DatePicker
                            isRequired
                            label="Scheduled Date and Time"
                            onChange={setValueDate}
                        />
                        <Select
                            isRequired
                            label="Urgency"
                            placeholder="Select urgency"
                            onChange={handleSelectionChangeUrgency}
                            defaultSelectedKeys={["normal"]}
                        >
                            <SelectItem key="urgent" value="ด่วน">
                                ด่วน
                            </SelectItem>
                            <SelectItem key="normal" value="ปกติ">
                                ปกติ
                            </SelectItem>
                            <SelectItem key="not_urgent" value="ไม่รีบ">
                                ไม่รีบ
                            </SelectItem>
                        </Select>
                        <Textarea
                            isRequired
                            name="job_description"
                            label="Problem Description"
                            placeholder="Describe the problem"
                            fullWidth
                            className="col-span-2"
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            name="house_number"
                            label="House Number"
                            placeholder="Enter house number"
                            fullWidth
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            name="street"
                            label="Street"
                            placeholder="Enter street"
                            fullWidth
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            name="subdistrict"
                            label="Subdistrict"
                            placeholder="Enter subdistrict"
                            fullWidth
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            name="district"
                            label="District"
                            placeholder="Enter district"
                            fullWidth
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            name="province"
                            label="Province"
                            placeholder="Enter province"
                            fullWidth
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            name="landmark"
                            label="Landmark"
                            placeholder="Enter landmark"
                            fullWidth
                            className="col-span-2"
                            onChange={handleChange}
                        />
                    </form>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Images
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="block w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={handleFileChange}
                        />
                        {formData.img_description.length > 0 && (
                            <div className="flex flex-wrap justify-start mt-4 gap-4">
                                {formData.img_description.slice(0, 3).map((img, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={img.previewUrl}
                                            alt={`Uploaded ${index}`}
                                            className="h-36 w-36 object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                {formData.img_description.length > 3 && (
                                    <div className="flex items-center justify-center h-36 w-36 rounded-md">
                                        <span className="text-lg font-medium text-gray-600">
                                            +{formData.img_description.length - 3}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onPress={handleSave}>
                    Save
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </>
    );
}
