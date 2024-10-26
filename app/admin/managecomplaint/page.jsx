"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback } from "react";
import { faMoneyCheck,faRepeat,faUserSlash,faCircleExclamation,faPersonHarassing } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab, Chip,Card, CardBody } from "@nextui-org/react";
import TablesComplaintComponent from "@/components/admin/complaint/TablesComplaintComponent";
export default function  Page() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    console.log("กระทำการ fetch");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/complaints/getcomplaintsbyadmin`);
      if(res.ok){
        const result = await res.json();
        setData(result);
      }

  };
  useEffect(() => {
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
                </div>
                <div className="w-full h-full">
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
          key="no_action"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5" />
              <span>ยังไม่ได้ดำเนินการ</span>
              <Chip size="sm" color="warning" variant="shadow">{data.filter(o=>o.complaint_result=='no_action').length}</Chip>
            </div>
          }
        >
          <Card><CardBody>
              <TablesComplaintComponent data={data.filter(o=>o.complaint_result=='no_action')} fetchData={fetchData}/>
            </CardBody>
            </Card>
        </Tab>
        <Tab
          key="warn"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faPersonHarassing} className="h-5 w-5" />
              <span>ตักเตือน</span>
              <Chip size="sm" color="success" variant="shadow">{data.filter(o=>o.complaint_result=='warn').length}</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <TablesComplaintComponent data={data.filter(o=>o.complaint_result=='warn')} fetchData={fetchData}/>
            </CardBody>
            </Card>
        </Tab>
        <Tab
          key="replace"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faRepeat} className="h-5 w-5" />
              <span>เปลี่ยนช่าง</span>
              <Chip size="sm" color="success" variant="shadow">{data.filter(o=>o.complaint_result=='replace').length}</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <TablesComplaintComponent data={data.filter(o=>o.complaint_result=='replace')} fetchData={fetchData}/>
            </CardBody>
            </Card>
        </Tab> 
        <Tab
          key="refund"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faMoneyCheck} className="h-5 w-5" />
              <span>คืนเงินลูกค้า</span>
              <Chip size="sm" color="success" variant="shadow">{data.filter(o=>o.complaint_result=='refund').length}</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <TablesComplaintComponent data={data.filter(o=>o.complaint_result=='refund')} fetchData={fetchData}/>
            </CardBody>
            </Card>
        </Tab>  
        <Tab
          key="baned"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUserSlash} className="h-5 w-5" />
              <span>แบนช่าง</span>
              <Chip size="sm" color="success" variant="shadow">{data.filter(o=>o.complaint_result=='baned').length}</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <TablesComplaintComponent data={data.filter(o=>o.complaint_result=='baned')} fetchData={fetchData}/>
            </CardBody>
            </Card>
        </Tab>                   

      </Tabs>
                </div>
            </div>
        </div>
    );
}
