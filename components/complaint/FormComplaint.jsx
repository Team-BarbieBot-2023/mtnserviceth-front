"use client";
import React, { useState, useRef} from "react";
import { Input, Textarea, Button, RadioGroup, Radio, useRadio, VisuallyHidden, cn } from "@nextui-org/react";
import { useRouter } from 'next/router';
export const RadioComplaintTitleOption = (props) => {
    const {
      Component,
      children,
      isSelected,
      description,
      getBaseProps,
      getWrapperProps,
      getInputProps,
      getLabelProps,
      getLabelWrapperProps,
      getControlProps,
    } = useRadio(props);
  
    return (
      <Component
        {...getBaseProps()}
        className={cn(
          "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
          "max-w-[300px] cursor-pointer border-2 border-default rounded-[32px] gap-4 p-2",
          "data-[selected=true]:border-primary",
        )}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <span {...getWrapperProps()}>
          <span {...getControlProps()} />
        </span>
        <div {...getLabelWrapperProps()}>
          {children && <span {...getLabelProps()}>{children}</span>}
          {description && (
            <span className="text-small text-foreground opacity-70">{description}</span>
          )}
        </div>
      </Component>
    );
};
export const RadioComplaintTitle=({title,setTitle})=>{
    const titles = ["งานไม่เรียบร้อย","ช่างมาผิดเวลา","งานล่าช้า",
        "การสื่อสารไม่ดี","ไม่เป็นไปตามข้อตกลง","ราคาไม่สมเหตุสมผล"];
    return (
        <RadioGroup value={title} onValueChange={setTitle}  orientation="horizontal" label="โปรดเลือกหัวข้อ">
             {titles.map((item,index) => (<RadioComplaintTitleOption key={index}  value={item}>{item}</RadioComplaintTitleOption>
             ))}
        </RadioGroup>
      );
}


export default function FormComplaint({ data }) {
    const [complaint, setComplaint] = useState(
        { user_id : data.user_id, 
            technician_id: data.technician_id,
            job_id: data.job_id,
            complaint_title: data.complaint_title,
            complaint_description: data.complaint_description,
            status: 'pending'});
            const [title, setTitle] = useState(data.complaint_title);

        //state emit update
        const handleChange = (e) => {
        const { name, value } = e.target;
        setComplaint(prevState => ({
            ...prevState,
            [name]: value
        }));
        };
        const handleComplaint = async (e) => {
        e.preventDefault();
         try {
            complaint.complaint_title = title;
            let result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/complaints`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(complaint),
              });
              if (result.ok) {
                router.push('/jobs');
              }
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <form onSubmit={handleComplaint}> 
            <RadioComplaintTitle title={title} setTitle={setTitle} />
            <div className="md:w-[100%] py-[24px]">
                <Textarea
                value={complaint.complaint_description}
                onChange={handleChange}
                isRequired
                name="complaint_description"
                label="Description"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Enter your description"
                />
            </div>
            <div className="md:flex md:items-center md:justify-between md:mt-[12px] mr-auto md:w-[100%]">
            <Button onClick={handleComplaint} className="ml-auto"  color="primary">รายงานปัญหานี้ให้เราทราบ</Button>  
            </div>
            
        </form>
      );
}
