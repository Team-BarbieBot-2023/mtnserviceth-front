"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Accordion, AccordionItem } from '@nextui-org/react';

const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('th-TH', {
            dateStyle: 'medium',
        }).format(date);
    } catch (error) {
        console.error("Failed to format date:", error);
        return dateString;
    }
};

const status = (item) => {
    switch (item) {
        case 'completed':
            return <span className="text-green-600 font-bold">สำเร็จ</span>;
        case 'canceled':
            return <span className="text-red-600 font-bold">ยกเลิก</span>;
        case 'pending':
            return <span className="text-yellow-600 font-bold">รอดำเนินการ</span>;
        case 'in_progress':
            return <span className="text-blue-600 font-bold">ดำเนินการ</span>;
        default:
            return <span className="text-gray-600 font-bold">ไม่ทราบสถานะ</span>;
    }
};

export default function Schedule({ initialData, userId }) {
    const [data, setData] = useState(initialData || []);
    const [visible, setVisible] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (job) => {
        setSelectedJob(job);
        setVisible(true);
    };

    const closeModal = () => setVisible(false);

    const openImageModal = (img) => {
        setSelectedImage(img);
    };

    const closeImageModal = () => setSelectedImage(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/schedule/${userId}`, {
                method: 'GET',
            });
            if (response.ok) {
                const updatedData = await response.json();
                setData(updatedData);
            }
        } catch (error) {
            console.error("Error re-fetching data:", error);
        }
    };

    const handleStatusUpdate = async (id) => {
        setIsUpdating(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/updatestatusjobscompleted/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'completed' }),
            });

            if (response.ok) {
                console.log('Status updated successfully');
                await fetchData(); // Re-fetch the updated data
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsUpdating(false);
            closeModal();
        }
    };

    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
            <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
                <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6 flex justify-between items-center">
                    <div>
                        <FontAwesomeIcon icon={faClipboardList} className="h-10 w-10 mr-4" />
                        <span>Schedules</span>
                    </div>
                </div>

                <Accordion variant="splitted" collapsible>
                    {data.map((data, index) => {
                        const customerDetails = JSON.parse(data.customer_details);
                        const images = JSON.parse(data.img_description);

                        return (
                            <AccordionItem
                                key={index}
                                title={
                                    <div className="flex justify-between items-center">
                                        <span>Job {index + 1}: {data.job_title}</span>
                                        <span>{status(data.status)}</span>
                                    </div>
                                }
                            >
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <p><strong>Job Type:</strong> {data.job_type}</p>
                                            <p><strong>Description:</strong> {data.job_description}</p>
                                            <p><strong>Scheduled Date & Time:</strong> {formatDate(data.scheduled_datetime)}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p><strong>Phone:</strong> {data.phone}</p>
                                            <p><strong>Urgency:</strong> {data.urgency}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-bold text-gray-800">Customer Details:</h4>
                                        <p className="text-gray-700">
                                            <strong>House Number:</strong> {customerDetails.house_number},
                                            <strong> Street:</strong> {customerDetails.street},
                                            <strong> Subdistrict:</strong> {customerDetails.subdistrict},
                                            <strong> District:</strong> {customerDetails.district},
                                            <strong> Province:</strong> {customerDetails.province},
                                            <strong> Landmark:</strong> {customerDetails.landmark}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-bold text-gray-800">Image Descriptions:</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
                                            {images.map((img, imgIndex) => (
                                                <div
                                                    key={imgIndex}
                                                    className="bg-gray-100 rounded-lg shadow-lg p-2 flex items-center justify-center cursor-pointer"
                                                    onClick={() => openImageModal(img)}
                                                >
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_BASE_API}/img/${img}`}
                                                        alt={`Job Image ${imgIndex + 1}`}
                                                        className="h-48 w-48 object-cover rounded-md"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 text-right">
                                        {data.status === "in_progress" && <Button color="primary" auto onPress={() => openModal(data)}>Mark as Completed</Button>}
                                        
                                    </div>
                                </div>

                                <Modal isOpen={visible} onClose={closeModal} aria-labelledby="modal-title">
                                    <ModalContent>
                                        <ModalHeader className="flex flex-col gap-1">
                                            Confirm Completion
                                        </ModalHeader>
                                        <ModalBody>
                                            Are you sure you want to mark this job as completed?
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onPress={() => handleStatusUpdate(selectedJob?.id)} disabled={isUpdating}>
                                                {isUpdating ? 'Updating...' : 'Confirm'}
                                            </Button>
                                            <Button color="danger" variant="light" onPress={closeModal}>
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>

                                <Modal isOpen={!!selectedImage} onClose={closeImageModal} aria-labelledby="image-modal-title">
                                    <ModalContent>
                                        <ModalHeader className="flex flex-col gap-1">
                                            Job Image
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="flex items-center justify-center">
                                                <img src={`${process.env.NEXT_PUBLIC_BASE_API}/img/${selectedImage}`} alt="Selected Job Image" className="max-h-[80vh] max-w-full object-cover rounded-md" />
                                            </div>
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </div>
    );
}
