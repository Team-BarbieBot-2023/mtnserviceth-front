"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonHarassing } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import {useDisclosure,
  Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import ModalActionComponent from "@/components/admin/complaint/ModalActionComponent";
export default function TablesComplantComponent({ data,fetchData}) {
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
        <TableColumn className="text-left" key="job_title">JOB TITLE</TableColumn>
        <TableColumn className="text-left" key="complaint_title">COMPLAINT</TableColumn>
        <TableColumn className="text-left" key="complaint_description">DETAIL</TableColumn>
        <TableColumn className="text-center" key="created_at">COMPLAINT AT</TableColumn>
        <TableColumn className="text-center" key="userName">CUSTOMER</TableColumn>       
        <TableColumn key="customer_details">CUSTOMER DETAILS</TableColumn>
        <TableColumn className="text-center" key="techName">TECHNICIAN</TableColumn> 
        <TableColumn className="text-center" key="button"></TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.complaint_id}>
            {(columnKey) => {
              let value = item[columnKey];

              if (columnKey === "customer_details") {
                const details = parseJSON(value);
                value = `${details.house_number}, ${details.street}, ${details.subdistrict}, ${details.district}, ${details.province}, ${details.landmark}`;
              }

              if (columnKey === "created_at" || columnKey === "updated_at") {
                value = formatDateTime(value);
              }

              if (columnKey === "status") {
                switch (value) {
                  case 'completed':
                    value = "สำเร็จ";
                    break;
                  case 'canceled':
                    value = "ยกเลิก";
                    break;
                  case 'pending':
                    value = "รอดำเนินการ";
                    break;
                  case 'in_progress':
                    value = "ดำเนินการ";
                    break;
                  default:
                    value = "ไม่ทราบสถานะ";
                }
              }
              if (columnKey === "button") {
                value = <div className='flex'>
                  {item.technician_id>0?
                    (
                    <Button onClick={() => onAction(item)}
                    className='px-[10px] py-[0]'
                    color="warning"
                    variant="light" startContent={<FontAwesomeIcon icon={faPersonHarassing} />}>ดำเนินการ</Button>
                    ):(<p></p>)
                  }

                </div>;
              }
              const cellAlignment =
                (columnKey === "customer_details"  || columnKey=== "job_title" || columnKey=== "complaint_title" || columnKey=== "complaint_description") ? "text-left" : "text-center";

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
// Helper to safely parse JSON fields
const parseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return jsonString;
  }
};

// Helper to format date and time
const formatDateTime = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('th-TH', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch (error) {
    console.error("Failed to format date:", error);
    return dateString;
  }
};


