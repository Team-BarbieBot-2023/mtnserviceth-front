"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback } from "react";
import { faMoneyCheck,faRepeat,faUserSlash,faCircleExclamation,faPersonHarassing, faBriefcaseMedical, faCirclePlus, faTimeline } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalContent, ModalFooter, useDisclosure,Tabs, Tab, Chip,Card, CardBody } from "@nextui-org/react";

export default function  Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    // ดึงข้อมูลจาก backend API
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/complaints/getmycomplaints/${userId}`);
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);
    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
            <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
                <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6 flex">
                    <div className="w-full m-auto">
                        <span>
                            <FontAwesomeIcon icon={faPersonHarassing} className="h-10 w-10" /> All Complaints
                        </span>
                    </div>
                    <div className="w-full text-end gap-2 flex justify-end">

                    </div>
                </div>
                <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
        <Tab
          key="exclamation"
          title={
            <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5" />
              <span>ยังไม่ได้ดำเนินการ</span>
              <Chip size="sm" variant="faded">9</Chip>
            </div>
          }
        >
                        <Card>
            <CardBody>
            <div>content</div>
            </CardBody>
            </Card>
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faPersonHarassing} className="h-5 w-5" />
              <span>ตักเตือน</span>
              <Chip size="sm" variant="faded">3</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <div>content</div>
            </CardBody>
            </Card>
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faRepeat} className="h-5 w-5" />
              <span>เปลี่ยนช่าง</span>
              <Chip size="sm" variant="faded">3</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <div>content</div>
            </CardBody>
            </Card>
        </Tab> 
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faMoneyCheck} className="h-5 w-5" />
              <span>คืนเงินลูกค้า</span>
              <Chip size="sm" variant="faded">3</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <div>content</div>
            </CardBody>
            </Card>
        </Tab>  
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUserSlash} className="h-5 w-5" />
              <span>แบนช่าง</span>
              <Chip size="sm" variant="faded">3</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <div>content</div>
            </CardBody>
            </Card>
        </Tab>                   

      </Tabs>

            </div>
        </div>
    );
}
