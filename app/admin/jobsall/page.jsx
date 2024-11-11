"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback } from "react";
import { faBuildingUser, faUserPlus, faUserXmark, faUserCheck, faUserClock, faPersonCircleCheck, faPersonDigging, faMoneyCheck, faRepeat, faUserSlash, faCircleExclamation, faPersonHarassing } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab, Chip, Card, CardBody } from "@nextui-org/react";
import TablesComplaintComponent from "@/components/admin/complaint/TablesComplaintComponent";
import TablesJobByAdminComponent from "@/components/admin/job/TablesJobByAdminComponent";
export default function Page() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/jobsbyadmin`);
    if (res.ok) {
      const result = await res.json();
      setData(result);
      //'completed','canceled','pending','in_progress'
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
      <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
        <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6 flex">
          <div className="w-full m-auto">
            <span>
              <FontAwesomeIcon icon={faBuildingUser} className="h-10 w-10" /> Jobs All
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
            {/* <Tab
              key="pending"
              title={
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUserPlus} className="h-5 w-5" />
                  <span>pending</span>
                  <Chip size="sm" color="warning" variant="shadow">{data.filter(o => o.status == 'pending').length}</Chip>
                </div>
              }
            >
              <Card><CardBody>
                <TablesJobByAdminComponent data={data.filter(o => o.status == 'pending')} fetchData={fetchData} />
              </CardBody>
              </Card>
            </Tab> */}
            <Tab
              key="in_progress"
              title={
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUserClock} className="h-5 w-5" />
                  <span>in progress</span>
                  <Chip size="sm" color="primary" variant="shadow">{data.filter(o => o.status == 'in_progress').length}</Chip>
                </div>
              }
            >
              <Card><CardBody>
                <TablesJobByAdminComponent data={data.filter(o => o.status == 'in_progress')} fetchData={fetchData} />
              </CardBody>
              </Card>
            </Tab>
            <Tab
              key="completed"
              title={
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUserCheck} className="h-5 w-5" />
                  <span>completed</span>
                  <Chip size="sm" color="primary" variant="shadow">{data.filter(o => o.status == 'completed').length}</Chip>
                </div>
              }
            >
              <Card><CardBody>
                <TablesJobByAdminComponent data={data.filter(o => o.status == 'completed')} fetchData={fetchData} />
              </CardBody>
              </Card>
            </Tab>
            <Tab
              key="canceled"
              title={
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUserXmark} className="h-5 w-5" />
                  <span>canceled</span>
                  <Chip size="sm" color="primary" variant="shadow">{data.filter(o => o.status == 'canceled').length}</Chip>
                </div>
              }
            >
              <Card><CardBody>
                <TablesJobByAdminComponent data={data.filter(o => o.status == 'canceled')} fetchData={fetchData} />
              </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
