import { Modal,ModalHeader,ModalContent, Textarea, ModalFooter, Button, Select, DatePicker, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import React, { useState, useEffect} from 'react';

export default function ModalActionComponent({ isOpen, onOpenChange,obj }) {
    const { data: session } = useSession();
    const [valueDate, setValueDate] = React.useState(parseDate("2024-04-04"));
    const [formData, setFormData] = useState(null);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectionChange = (e) => {
        formData.complaint_result = e.target.value
    };

    const handleSave = async () => {
        formData.scheduled_datetime = valueDate;
        if (!formData.phone || !formData.job_title || !formData.job_description || !formData.scheduled_datetime || !formData.urgency) {
            alert('Please fill in all required fields.');
            return;
        }

        const data = new FormData();
        data.append('complaint_title', formData.complaint_title);
        data.append('complaint_description', formData.complaint_description);
        data.append('resolution', formData.resolution);
        data.append('complaint_result', formData.complaint_result);
        data.append('complaint_id', formData.complaint_id);
        data.append('job_id', formData.job_id);
        data.append('technician_id', formData.technician_id);
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

    useEffect(() => {
        if (obj) {
            setFormData(obj);
            console.log(formData);
        }
      }, [obj]);
    if (!session) {
        return null;
    }
    if (!isOpen) return null;

    return (
        <>    
               {formData ? (
        <Modal
        className="max-w-xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        >
                        <ModalHeader className="flex flex-col gap-1">
                <h1>{formData.complaint_title}</h1> : resolution</ModalHeader>
                <ModalContent className='p-5'>
            {(onClose) => (
            <>
                       <div>
                       <h1 className='my-2'>Complaint Title : {formData.complaint_title}</h1>
                        <form className="grid gap-2 my-4">
                        <Textarea
                        value={formData.resolution}
                        onChange={handleInputChange}
                        isRequired
                        name="resolution"
                        label="Description"
                        placeholder="Enter your description"
                        className="w-full"
                        />
                            <Select
                                isRequired
                                label="result"
                                placeholder="Select result"
                                onChange={handleSelectionChange}
                                defaultSelectedKeys={[formData.complaint_result]}
                            >
                                <SelectItem key="no_action" value="no_action">
                                    ยังไม่ได้ดำเนินการ
                                </SelectItem>
                                <SelectItem key="warn" value="warn">
                                    ตักเตือน
                                </SelectItem>
                                <SelectItem key="ban" value="ban">
                                    แบนช่าง
                                </SelectItem>
                                <SelectItem key="replace" value="replace">
                                เปลี่ยนช่าง
                                </SelectItem>
                                <SelectItem key="refund" value="refund">
                                    คืนเงินลูกค้า
                                </SelectItem>
                            </Select>
                        </form>
                </div>   
                <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                </Button>
                <Button color="primary" onPress={handleSave}>
                    Save
                </Button>
            </ModalFooter>
            </>
          )}
            </ModalContent>
        </Modal>
        ) : (
          <Text>Loading...</Text>
        )}                    
        </>
    );
}
