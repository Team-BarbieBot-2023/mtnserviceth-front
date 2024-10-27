"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import {useDisclosure,
  User,Chip,
  Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
export default function TablesTechnicianByAdminComponent({ data,fetchData}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 13;
  const statusColorMap = {
    "active": "success",
    "banned": "warning",
  };
  
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
        <TableColumn className="text-left" key="name">NAME</TableColumn>
        <TableColumn className="text-left" key="phone">PHONE</TableColumn>
        <TableColumn className="text-left" key="complaint_count">COMPLAINT</TableColumn>
        <TableColumn className="text-left" key="experience_level">LEVEL</TableColumn>
        <TableColumn className="text-left" key="status">STATUS</TableColumn>  
        <TableColumn className="text-center" key="button"></TableColumn>      
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={data}>
      {(item) => (
          <TableRow key={item.complaint_id}>
            {(columnKey) => {
              let value = item[columnKey];
              if (columnKey === "name") {
                value = 
                <User
                avatarProps={{radius: "lg", src: item.image}}
                description={item.email}
                name={item.name}
              >
              </User>
              }
              if (columnKey === "status"){
                value=
                item.status!==""?(
                <Chip className="capitalize" color={statusColorMap[item.status]} size="sm" variant="flat">
                {item.status}
              </Chip>):(<p></p>)
              }
              if (columnKey === "button") {
                value = <div className='flex'>
                  {item.technician_id>0?
                    (
                        <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                          <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                              <FontAwesomeIcon icon={faEllipsisVertical}/>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem onPress={()=>{alert("ข้อความที่ต้องการแจ้งเตือน");}} >Active</DropdownItem>
                            <DropdownItem onPress={()=>{ alert("ข้อความที่ต้องการแจ้งเตือน");}}>Banned</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    ):(<p></p>)
                  }

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


