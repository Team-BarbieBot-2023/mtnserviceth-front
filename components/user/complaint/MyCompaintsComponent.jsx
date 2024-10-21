"use client";
import React, { useState, useEffect } from "react";
import {Accordion, AccordionItem, Avatar} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
export default function MyComplaintComponent({userId}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    // ดึงข้อมูลจาก backend API
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/complaints/getmycomplaints/${userId}`);
      const result = await res.json();
      console.log(result);
      setData(result);
    };
    fetchData();
  }, []);
    return (
        <div className="p-10">
          <h1 className="text-3xl">My Compaints</h1>
          
          <Accordion selectionMode="multiple">
          {data.map((item, index) => (
                  <AccordionItem
                  key={index}
                  aria-label={item.job_title}
                  startContent={
                  <FontAwesomeIcon icon={faFeather} className="text-blue-500 text-3xl h-10 w-10 mx-[10px]" />
                  }
                  subtitle={item.updated_at}
                  title={<span>{item.job_title}<span className="mx-2 text-green-600">({item.status})</span></span>}
                >
                <div className="rounded-lg p-4 bg-gray-100 bg-opacity-80 border border-gray-200 border-opacity-80 text-gray-600">
                <div className="flex">
                <label className="mr-2" htmlFor="job">Title:</label>
                <p>{item.complaint_title}<span className="mx-2">/ {item.complaint_description}</span></p>                 
                </div>  
                <div className="flex">                
                <label className="mr-2" htmlFor="job">Resolution:</label>
                <p>{item.resolution}</p>
                </div>    
                </div>
                </AccordionItem>
                  ))}
             </Accordion>
        </div>
      );
}
