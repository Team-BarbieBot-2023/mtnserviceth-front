"use client";
import React from 'react';
import { Button } from '@nextui-org/react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const { data: session } = useSession();

    if (!session) {
       // router.push('/');
    }

    return (
            <div className="md:flex h-screen w-full justify-center">
            <div className="relative">
                <div className="md:flex w-full h-full justify-center items-center">
                    <div>
                        <div className="md:grid grid-cols-[auto_40%] h-screen w-screen">
                            <div className="md:flex md:flex-col md:box-border md:h-full md:min-h-0 md:px-[128px] md:py-[64px]">
                            <div className="md:flex md:flex-col md:items-start">
                                <div className="mb-[24px]">
                                    <iframe src="./assets/next.svg" width="100" height="20"></iframe>
                                </div>
                                <div className="md:flex md:flex-1 md:min-w-[512px] md:overflow-auto md:w-[75%]">
                                    <div>
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
                                <div className="md:flex md:items-center md:justify-between md:mt-[32px] ml-auto">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ml-auto">
                                        รายงาน
                                    </button>
                                </div>
                            </div>     
                            </div>
                            <div className="bg-[rgb(97,97,255)] md:flex md:justify-center md:overflow-hidden">
                                <img className="md:block md:h-full md:w-auto" src="./assets/img-report.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default Page;
