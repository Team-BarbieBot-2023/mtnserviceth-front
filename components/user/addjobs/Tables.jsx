"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { faUserPlus, faUserXmark, faUserCheck, faUserClock } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";
import TablesJobByUserComponent from "@/components/user/addjobs/TablesJobByUserComponent";
import TablesJobCanceledByUserComponent from "@/components/user/addjobs/TablesJobCanceledByUserComponent";
import TablesJobPendingByUserComponent from "@/components/user/addjobs/TablesJobPendingByUserComponent";
export default function Tables({ userId, model }) {
  const [data, setData] = useState(model);

  // ฟังก์ชันเพื่อดึงข้อมูลจาก API
  const fetchData = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/${id}`);
    if (res.ok) {
      const result = await res.json();
      setData(result);
    }
  }

  // useEffect เมื่อ Component โหลดครั้งแรกหรือเมื่อ model เปลี่ยนแปลง
  useEffect(() => {
    setData(model); // อัปเดต data เมื่อ model เปลี่ยนแปลง
  }, [model]);

  // useEffect เพื่อดึงข้อมูลเมื่อ Component โหลดครั้งแรก
  useEffect(() => {
    fetchData(userId);
  }, [userId]);

  return (
    <div className="w-full h-full">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full flex rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
        <Tab
          key="pending"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUserPlus} className="h-5 w-5" />
              <span>Pending</span>
              <Chip size="sm" color="warning" variant="shadow">{data.filter(o => o.status == 'pending').length}</Chip>
            </div>
          }
        >
          <Card>
            <CardBody>
              <TablesJobPendingByUserComponent data={data.filter(o => o.status == 'pending')} fetchData={fetchData} />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="in_progress"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUserClock} className="h-5 w-5" />
              <span>In progress</span>
              <Chip size="sm" color="primary" variant="shadow">{data.filter(o => o.status == 'in_progress').length}</Chip>
            </div>
          }
        >
          <Card>
            <CardBody>
              <TablesJobByUserComponent data={data.filter(o => o.status == 'in_progress')} fetchData={fetchData} />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="completed"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUserCheck} className="h-5 w-5" />
              <span>Completed</span>
              <Chip size="sm" color="primary" variant="shadow">{data.filter(o => o.status == 'completed').length}</Chip>
            </div>
          }
        >
          <Card>
            <CardBody>
              <TablesJobByUserComponent data={data.filter(o => o.status == 'completed')} fetchData={fetchData} />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="canceled"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUserXmark} className="h-5 w-5" />
              <span>Canceled</span>
              <Chip size="sm" color="primary" variant="shadow">{data.filter(o => o.status == 'canceled').length}</Chip>
            </div>
          }
        >
          <Card>
            <CardBody>
              <TablesJobCanceledByUserComponent data={data.filter(o => o.status == 'canceled')} fetchData={fetchData} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
