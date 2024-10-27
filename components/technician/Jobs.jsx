"use client";
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useSession } from "next-auth/react";

const parseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return {};
  }
};

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

export default function Jobs({ data }) {

  console.log(data)
  const { data: session, status, update } = useSession();

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 13;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const handleJobAction = async (item) => {
    const data = { user_id: session.user._id, technician_id: 0, status: "in_progress", to: item.user_id }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/updatestatusjobsinprogress/${item.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      console.log(response.ok);

      if (!response.ok) {
        throw new Error(`Failed to fetch technician data: ${response.statusText}`);
      }

      window.location = `${process.env.NEXT_PUBLIC_BASE_URL}/technician/schedule`
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }

  };

  if (!session) {
    return null;
  }


  return (
    <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
      <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
        <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6">
          <span>
            <FontAwesomeIcon icon={faBriefcase} className="h-10 w-10" /> All Work
          </span>
        </div>
        <div className="flex gap-12 justify-center">
          <div className="bg-gray-50 p-10 rounded-xl shadow-md text-center w-full">
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
                <TableColumn className="text-center" key="button"></TableColumn>
              </TableHeader>
              <TableBody items={items} emptyContent={"No Data."}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => {
                      let value = item[columnKey];

                      if (columnKey === "customer_details") {
                        const details = parseJSON(value);
                        value = `${details.house_number || ''}, ${details.street || ''}, ${details.subdistrict || ''}, ${details.district || ''}, ${details.province || ''}, ${details.landmark || ''}`;
                      } else if (["created_at", "updated_at"].includes(columnKey)) {
                        value = formatDateTime(value);
                      } else if (columnKey === "button") {
                        value = <Button size="sm" onClick={() => handleJobAction(item)}>Take this Job</Button>;
                      }

                      if (columnKey === "scheduled_datetime") {
                        value = formatDate(value);
                      }

                      const cellAlignment =
                        columnKey === "customer_details" ? "text-left" : "text-center";

                      return (
                        <TableCell className={cellAlignment} key={columnKey}>
                          {value}
                        </TableCell>
                      );
                    }}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
