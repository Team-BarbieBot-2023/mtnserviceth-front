"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import {
  User,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import ModalActionComponent from "@/components/admin/complaint/ModalActionComponent";
export default function TablesJobByAdminComponent({ data, fetchData }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 13;

  const validData = Array.isArray(data) ? data : [];

  const pages = validData.length > 0 ? Math.ceil(validData.length / rowsPerPage) : 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return validData.slice(start, end);
  }, [page, validData]);

  if (validData.length === 0) {
    return <div>No data available</div>;
  }

  const onActionCancel=async (id,job_title )=>{
    let result = confirm(`คุณต้องการยกเลิก  [${job_title}] หรือไม่?`);
      if (result) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/canceljob/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status:status}),
        });
        if (response.ok) {
         fetchData();
        }    
      }
  }

  


  
  const onActionReplace=async (id,technician_name )=>{
    let result = confirm(`คุณต้องการถอด  [${technician_name}] หรือไม่?`);
      if (result) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/removetechnician/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status:status}),
        });
        if (response.ok) {
         fetchData();
        }    
      }
  }


  return (
    <>
      <Table
        aria-label="table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center border-t-1 pt-4">
            <Pagination isCompact showControls showShadow color="secondary" page={page} total={pages} onChange={(page) => setPage(page)} />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px] bg-[#f9fafb] shadow-none",
        }}
      >
        <TableHeader>
          <TableColumn className="text-left" key="customer">CUSTOMER</TableColumn>
          <TableColumn className="text-left" key="job_type">JOB TYPE</TableColumn>
          <TableColumn className="text-left" key="job_title">JOB TITLE</TableColumn>
          <TableColumn className="text-left" key="job_description">JOB DESCRIPTION</TableColumn>
          <TableColumn className="text-left" key="urgency">JOB URGENCY</TableColumn>
          <TableColumn className="text-left" key="technician">TECHNICIAN</TableColumn>
          <TableColumn className="text-center" key="button"></TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={data}>
          {(item) => (
            <TableRow key={item.job_id}>
              {(columnKey) => {
                let value = item[columnKey];
                if (columnKey === "customer") {
                  value =
                    <User
                      avatarProps={{ radius: "lg", src: item.user_image }}
                      description={item.user_email}
                      name={item.user_name}
                    >
                    </User>
                }
                if (columnKey === "technician" && item.technician_id > 0) {
                  value =
                    <User
                      avatarProps={{ radius: "lg", src: item.technician_image }}
                      description={item.technician_email}
                      name={item.technician_name}
                    >
                    </User>
                }
              if (columnKey === "button") {
                value = <div className='flex'>
                       <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                          <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                              <FontAwesomeIcon icon={faEllipsisVertical}/>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                          {!item.technician_id && (
                            <DropdownItem onPress={()=>{ onActionCancel(item.job_id,item.job_title)}}>
                              ยกเลิกงาน
                              </DropdownItem>
                            )}

                            {item.technician_id>0 &&  (
                            <DropdownItem onPress={()=>{ onActionReplace(item.job_id,item.technician_name)}}>
                              ถอดช่างออกจากงาน
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                </div>;
              }  

                const cellAlignment = "text-left"
                return <TableCell className={cellAlignment}>{value}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>

  );
}


