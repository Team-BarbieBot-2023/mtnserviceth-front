"use client";
import React from 'react';
import { ModalBody, ModalHeader, Input, Textarea, ModalFooter, Button, Select, DatePicker, SelectItem } from '@nextui-org/react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const { data: session } = useSession();
    const [value, setValue] = React.useState(new Set([]));
    const [touched, setTouched] = React.useState(false);

    const jobs = [
        {key: "1", label: "ซ่อมท่อประปา"},
        {key: "2", label: "ปรับปรุงทางเดินหน้าชั้น 14"},
      ];
    if (!session) {
       // router.push('/');
    }

    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
        <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
        <div className="md:flex justify-center">
            <div className="relative">
                <div className="md:flex justify-center items-center">
                    <div>
                        <div className="md:grid grid-cols-[auto__30%]">
                            <div className="md:flex md:flex-col md:box-border md:h-full md:min-h-0 md:px-[64px] md:py-[32px]">
                            <div className="md:flex md:flex-col md:items-start">
                                <div className="mb-[24px]">
                                {/* <img className="md:block md:h-[100%] md:w-auto" src="./../assets/complaints.png"/> */}
                                </div>
                                <div className="md:flex md:flex-1 md:min-w-[512px] md:overflow-auto md:w-[75%]">
                                    <div className="md:py-[32px]">
                                        <h2>สวัสดีคุณ Tonsaly,ถ้าคุณพบปัญหาอะไรเกี่ยวกับบริการของเรา โปรดแจ้งให้เราทราบ</h2>
                                        <div className="md:flex md:flex-row md:flex-wrap">
                                            <div className="mr-2 mt-4 md:min-w-fit mb-2">
                                                <label className="bg-white border border-[#c3c6d4] rounded-[32px] text-[#676879] text-[16px] min-h-[20px] py-2 px-4 w-fit">
                                                    <span >
                                                        <input name="complaint_title" type="radio" value="ช่างมาผิดเวลา"/>
                                                        <span ></span></span>
                                                    <span >ช่างมาผิดเวลา</span>
                                                </label>
                                            </div>
                                            <div className="mr-2 mt-4 md:min-w-fit  mb-2">
                                                <label className="bg-white border border-[#c3c6d4] rounded-[32px] text-[#676879] text-[16px] min-h-[20px] py-2 px-4 w-fit">
                                                    <span >
                                                        <input name="complaint_title" type="radio" value="งานล่าช้า"/>
                                                        <span ></span></span>
                                                    <span >งานล่าช้า</span>
                                                </label>
                                            </div>
                                            <div className="mr-2 mt-4 md:min-w-fit  mb-2">
                                                <label className="bg-white border border-[#c3c6d4] rounded-[32px] text-[#676879] text-[16px] min-h-[20px] py-2 px-4 w-fit">
                                                    <span >
                                                        <input name="complaint_title"  type="radio" value="งานไม่เรียบร้อย"/>
                                                        <span ></span></span>
                                                    <span >งานไม่เรียบร้อย</span>
                                                </label>
                                            </div> 
                                            <div className="mr-2 mt-4 md:min-w-fit  mb-2">
                                                <label className="bg-white border border-[#c3c6d4] rounded-[32px] text-[#676879] text-[16px] min-h-[20px] py-2 px-4 w-fit">
                                                    <span >
                                                        <input name="complaint_title"  type="radio" value="การสื่อสารไม่ดี"/>
                                                        <span ></span></span>
                                                    <span >การสื่อสารไม่ดี</span>
                                                </label>
                                            </div>  
                                            <div className="mr-2 mt-4 md:min-w-fit  mb-2">
                                                <label className="bg-white border border-[#c3c6d4] rounded-[32px] text-[#676879] text-[16px] min-h-[20px] py-2 px-4 w-fit">
                                                    <span >
                                                        <input name="complaint_title" type="radio" value="ไม่เป็นไปตามข้อตกลง"/>
                                                        <span ></span></span>
                                                    <span >ไม่เป็นไปตามข้อตกลง</span>
                                                </label>
                                            </div>
                                            <div className="mr-2 mt-4 md:min-w-fit  mb-2">
                                                <label className="bg-white border border-[#c3c6d4] rounded-[32px] text-[#676879] text-[16px] min-h-[20px] py-2 px-4 w-fit">
                                                    <span >
                                                        <input name="complaint_title"  type="radio" value="ราคาไม่สมเหตุสมผล"/>
                                                        <span ></span></span>
                                                    <span >ราคาไม่สมเหตุสมผล</span>
                                                </label>
                                            </div>
                                            <div className="mr-2 mt-4 md:min-w-fit  mb-2">
                                                <label className="bg-white border border-[#c3c6d4] rounded-[32px] text-[#676879] text-[16px] min-h-[20px] py-2 px-4 w-fit">
                                                    <span >
                                                        <input name="complaint_title"  type="radio" value="ปัญหาความปลอดภัย"/>
                                                        <span ></span></span>
                                                    <span >ปัญหาความปลอดภัย</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-[75%]">
                                <Textarea
                                    label="Description"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    placeholder="Enter your description"
                                    
                                    />
                                </div>
                                <div className='md:w-[75%] md:py-[32px] '>
                                <Select
                                    label="Favorite Animal"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    placeholder="Select an animal"
                                    description="The second most popular pet in the world"
                                    selectedKeys={value}
                                    className="max-w-xs"
                                    onSelectionChange={setValue}
                                    onClose={() => setTouched(true)}
                                    >
                                    {jobs.map((job) => (
                                        <SelectItem key={job.key}>
                                        {job.label}
                                        </SelectItem>
                                    ))}
                                    </Select>
                                </div>
                                <div className="md:flex md:items-center md:justify-between md:mt-[32px] mr-auto md:w-[75%]">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ml-auto">
                                        รายงาน
                                    </button>
                                </div>
                            </div>     
                            </div>
                            <div className="md:flex md:justify-center md:overflow-hidden">
                                <img className="md:block md:h-[100%] md:w-auto" src="./../assets/img-report.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Page;
