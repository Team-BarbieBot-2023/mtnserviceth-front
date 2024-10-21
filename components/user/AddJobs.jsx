"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseMedical, faCirclePlus, faTimeline } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import Table from "@/components/user/addjobs/Tables";
import Add from "@/components/user/addjobs/Add";
import MyCompaintsComponent from "@/components/user/complaint/MyCompaintsComponent";

export default function AddJobs({ initialData, userId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [data, setData] = useState(initialData); // Store data in state
    const [modalby,setModalBy] = useState('J');
    // Fetch data function to be reused
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch jobs data");
            const newData = await response.json();
            setData(newData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [userId]);

    // Close modal and refresh data
    const handleAddJob=()=>{
        setModalBy('J');
        onOpen();
    }
    const handleCompaintHistories=()=>{
        setModalBy('C');
        onOpen();
    }
    const handleClose = () => {
        onOpenChange(false); // Close the modal
        fetchData(); // Refresh the data
    };

    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
            <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
                <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6 flex">
                    <div className="w-full m-auto">
                        <span>
                            <FontAwesomeIcon icon={faBriefcaseMedical} className="h-10 w-10" /> Submit Job
                        </span>
                    </div>
                    <div className="w-full text-end gap-2 flex justify-end">
                    <Button
                            startContent={<FontAwesomeIcon icon={faTimeline} className="h-5 w-5 mx-[10px]" />}
                            onPress={handleCompaintHistories}
                            color="default"
                            auto
                        >
                            My Complaints
                    </Button>
                        <Button
                            startContent={<FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" />}
                            onPress={handleAddJob}
                            color="primary"
                            auto
                        >
                            Add Job
                        </Button>
                    </div>
                </div>
                <div className="flex gap-12 justify-center">
                    <div className="bg-gray-50 p-10 rounded-xl shadow-md text-center w-full">
                        <Table data={data} />
                        <Modal
                            className="max-w-4xl"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            isDismissable={false}
                            isKeyboardDismissDisabled={true}
                        >
                            <ModalContent>
                            {(onClose) => {
                                    return modalby === 'J' ? (
                                        <Add onClose={handleClose} />
                                    ) : (
                                        <MyCompaintsComponent userId={userId}  onClose={handleClose} />
                                    );
                                }}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}
