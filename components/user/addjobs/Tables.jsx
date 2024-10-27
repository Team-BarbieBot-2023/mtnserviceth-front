"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faPersonHarassing } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import {
  Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Tables({ data }) {
  const router = useRouter();
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

  return (
    <Table
      aria-label="Example table with client side pagination"
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
        <TableColumn key="job_title">TITLE</TableColumn>
        <TableColumn key="job_description">PROBLEM</TableColumn>
        <TableColumn className="text-center" key="job_type">TYPE</TableColumn>
        <TableColumn className="text-center" key="urgency">URGENCY</TableColumn>
        <TableColumn className="text-center" key="scheduled_datetime">SCHEDULED</TableColumn>
        <TableColumn className="text-center" key="phone">PHONE</TableColumn>
        <TableColumn key="customer_details">CUSTOMER DETAILS</TableColumn>
        <TableColumn className="text-center" key="created_at">CREATED AT</TableColumn>
        <TableColumn className="text-center" key="status">STATUS</TableColumn>
        <TableColumn className="text-center" key="button"></TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              let value = item[columnKey];

              if (columnKey === "customer_details") {
                const details = parseJSON(value);
                value = `${details.house_number}, ${details.street}, ${details.subdistrict}, ${details.district}, ${details.province}, ${details.landmark}`;
              }

              if (columnKey === "created_at" || columnKey === "updated_at") {
                value = formatDateTime(value);
              }

              if (columnKey === "scheduled_datetime") {
                value = formatDate(value);
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
                  {item.status !== 'pending' ? (
                    <Button onClick={() => router.push(`/complaints/${Number(item.id)}/create`)}
                      className='px-[10px] py-[0]'
                      color="warning"
                      variant="light" startContent={<FontAwesomeIcon icon={faPersonHarassing} />}>Complaint</Button>
                  ) : (<p></p>)}
                </div>;
              }
              const cellAlignment = columnKey === "customer_details" || columnKey === "job_title" || columnKey === "job_description" ? "text-left" : "text-center";

              return <TableCell className={cellAlignment}>{value}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
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

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('th-TH', {
      dateStyle: 'medium',
    }).format(date);
  } catch (error) {
    console.error("Failed to format date:", error);
    return dateString;
  }
};

