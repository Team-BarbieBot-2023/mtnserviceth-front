import { Modal,ModalHeader,ModalContent, Textarea, ModalFooter, Button, Select, DatePicker, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import React, { useState, useEffect} from 'react';

export default function ModalActionComponent({ isOpen, onOpenChange,obj,fetchData}) {
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

    const handleSave = async (onClose) => {
        formData.scheduled_datetime = valueDate;
        if (!formData.resolution || !formData.complaint_result) {
            alert('Please fill in all required fields.');
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/complaints/updatecase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('submit success');
                fetchData();
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
        }
      }, [obj]);
    if (!session) {
        return null;
    }
    if (!isOpen) return null;

    return (
        <>    
        <Modal
        className="max-w-xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        >
        <ModalContent className='p-5'>
        {(onClose) => (
        <>
        {formData?(<div>
            <h1 className='my-2'>Complaint Title : {formData.complaint_title}</h1>
            <h2 className='my-2 bg-gray-100 text-green-500 p-2 rounded-lg'>{formData.complaint_description}</h2>
            <form className="grid gap-2 my-4">
                    <Textarea
                    value={formData.resolution}
                    onChange={handleInputChange}
                    isRequired
                    name="resolution"
                    label="Description"
                    placeholder="Enter your description"
                    
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
                            <SelectItem key="baned" value="baned">
                                แบนและเปลี่ยนช่าง
                            </SelectItem>
                            <SelectItem key="replace" value="replace">
                            เปลี่ยนช่าง
                            </SelectItem>
                            <SelectItem key="refund" value="refund">
                            คืนเงินลูกค้า
                            </SelectItem>
                        </Select>
                    </form>    
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={()=>{handleSave(onClose);}}>
                            Save
                        </Button>
                    </ModalFooter>
        </div>):(<div>Loading ...</div>)}
        </>
        )}
        </ModalContent>
        </Modal>                  
        </>
    );
}
