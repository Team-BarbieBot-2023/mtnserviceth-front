"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback } from "react";
import { faPersonCircleCheck,faPersonDigging,faMoneyCheck,faRepeat,faUserSlash,faCircleExclamation,faPersonHarassing } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab, Chip,Card, CardBody } from "@nextui-org/react";
import TablesUserByAdminComponent from "@/components/admin/user/TablesUserByAdminComponent";
import TablesTechnicianByAdminComponent from "@/components/admin/user/TablesTechnicianByAdminComponent";
export default function  Page() {
  const [dataUser, setDataUser] = useState([]);
  const [dataTechnician, setDataTechnician] = useState([]);

  const fetchUsersData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/getusersbyadmin`);
      if(res.ok){
        const result = await res.json();
        setDataUser(result);
      }

  };
  const fetchTechniciansData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/gettechniciansbyadmin`);
    if(res.ok){
      const result = await res.json();
      setDataTechnician(result);
    }

};
const fetchData = async ()=>{
    await fetchUsersData();
    await fetchTechniciansData();
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
                            <FontAwesomeIcon icon={faPersonDigging} className="h-10 w-10" /> Users All
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
          key="users"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPersonCircleCheck} className="h-5 w-5" />
              <span>Users</span>
              <Chip size="sm" color="success" variant="shadow">{dataUser.length}</Chip>
            </div>
          }
        >
          <Card><CardBody>
              <TablesUserByAdminComponent data={dataUser} fetchData={fetchData}/>
            </CardBody>
            </Card>
        </Tab>
        <Tab
          key="gettechnician"
          title={
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faPersonDigging} className="h-5 w-5" />
              <span>Technicians</span>
              <Chip size="sm" color="warning" variant="shadow">{dataTechnician.length}</Chip>
            </div>
          }
        >
            <Card>
            <CardBody>
            <TablesTechnicianByAdminComponent data={dataTechnician} fetchData={fetchData}/>
            </CardBody>
            </Card>
        </Tab>
          
      </Tabs>
                </div>
            </div>
        </div>
    );
}
