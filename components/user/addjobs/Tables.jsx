"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import {Button,Row, Col, Tooltip,Table, TableHeader, TableColumn, TableBody, TableRow,TableCell, Pagination, getKeyValue
} from "@nextui-org/react";

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

export default function Tables({ data }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 13;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const handleReportAction = (id) => {
    console.log(id);
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
        <TableColumn className="text-center" key="job_title">TITLE</TableColumn>
        <TableColumn className="text-center" key="job_description">PROBLEM</TableColumn>
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
                value = <div className='flex'><Button onClick={()=>{console.log(item)}} className='px-[0] py-[0]' color="primary" variant="light"><FontAwesomeIcon icon={faThumbsDown} /></Button></div>;
              }
              const cellAlignment =
                columnKey === "customer_details" ? "text-left" : "text-center";

              return <TableCell className={cellAlignment}>{value}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
