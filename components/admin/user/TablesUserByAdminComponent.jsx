"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonHarassing } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import {useDisclosure,
  User,
  Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import ModalActionComponent from "@/components/admin/complaint/ModalActionComponent";
export default function TablesUserByAdminComponent({ data,fetchData}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [objData, setObjData] = useState(null)
  const [page, setPage] = useState(1);
  const rowsPerPage = 13;
  const onAction=(data)=>{
    setObjData(null);
    setObjData(data);
    onOpen();
  }

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
              const cellAlignment = "text-left"
              return <TableCell className={cellAlignment}>{value}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
    
<ModalActionComponent isOpen={isOpen}
onOpenChange={onOpenChange}
fetchData={fetchData}
obj={objData}/>
</>

  );
}


