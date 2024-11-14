"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPersonHarassing } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import {
  useDisclosure, User, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import ModalActionComponent from "@/components/admin/complaint/ModalActionComponent";
import { useRouter } from "next/navigation";

export default function TablesJobByUserComponent({ data, fetchData }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [objData, setObjData] = useState(null);
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
          <TableColumn className="text-left" key="technician_level">Lv.</TableColumn>
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
                    />;
                }
                if (columnKey === "technician" && item.technician_id > 0) {
                  value =
                    <User
                      avatarProps={{ radius: "lg", src: item.technician_image }}
                      description={item.technician_email}
                      name={item.technician_name}
                    />;
                }
                if (columnKey === "technician_level") {
                  value = item.technician_level ? `${item.technician_level}/5` : "";
                }
                if (columnKey === "button") {
                  value = (
                    <div className='flex'>
                      {item.status !== 'pending' && item.completion_num !== "1" ? (
                        <Button onClick={() => router.push(`/complaints/${Number(item.job_id)}/create`)}
                          className='px-[10px] py-[0]'
                          color="warning"
                          variant="light" startContent={<FontAwesomeIcon icon={faPersonHarassing} />}>
                          Complaint
                        </Button>
                      ) : (<p></p>)}
                    </div>
                  );
                }
                return <TableCell className="text-left">{value}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ModalActionComponent isOpen={isOpen}
        onOpenChange={onOpenChange}
        fetchData={fetchData}
        obj={objData} />
    </>
  );
}
