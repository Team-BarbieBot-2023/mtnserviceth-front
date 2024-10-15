"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseMedical, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import Table from "@/components/user/addjobs/Tables";
import Add from "@/components/user/addjobs/Add";

export default function AddJobs({ initialData, userId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [data, setData] = useState(initialData); // Store data in state

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
                    <div className="w-full text-end">
                        <Button
                            startContent={<FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" />}
                            onPress={onOpen}
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
                                {(onClose) => <Add onClose={handleClose} />}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}
