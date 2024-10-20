import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormComplaint from "@/components/complaint/FormComplaint";
const getJobByID = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/complaints/getjobbyid/${id}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch jobs data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export default async function Page({params}) {
    const session = await getServerSession(authOptions)
    const { job_id } = params;
    const jobInfo = await getJobByID(job_id);
    const data =  { user_id : session.user._id, 
        technician_id: jobInfo[0].technician_id,
        job_id: job_id,
        complaint_title: "งานไม่เรียบร้อย",
        complaint_description: "",
        status: 'pending'}
    return (
    <div className="flex-1 bg-gradient-to-tr from-gray-200 to-gray-100 p-9">
        <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md flex items-center">
        <div className="basis-3/5 justify-center items-center px-[24px]">
            <div className="mb-[12px]">
            <h1 className="text-4xl">Complaint</h1>
            </div>
            <div className="md:min-w-[512px] md:overflow-auto md:w-[75%]">
            <div className="md:py-[12px]">
            {session ? (<h2>สวัสดีคุณ {session.user.name},ถ้าคุณพบปัญหาอะไรเกี่ยวกับบริการของเรา โปรดแจ้งให้เราทราบ แล้วเราจะดำเนินการให้</h2>): (<p></p>)}
            </div>
            <div className="md:py-[12px]">
            <div className="rounded-lg p-4 bg-green-100 bg-opacity-80 border border-green-200 border-opacity-80 text-green-600">
            <div className="flex">
                <label className="mr-2" htmlFor="job">Job Name:</label>
                <p>{jobInfo[0].job_type} <span className="mx-2"><span>/</span>{jobInfo[0].job_description}</span></p>
            </div>   
            <div className="flex">
                <label className="mr-2" htmlFor="job">Technician:</label> <p>{jobInfo[0].name}</p> 
            </div>   
            </div>
            </div>
            <FormComplaint data={data}/>
            </div>
        </div>
        <div className="basis-2/5 md:flex md:justify-center md:overflow-hidden">
        <img className="md:block md:h-[100%] md:w-[80%]" src="/assets/img-report.jpg"/>
        </div>
        </div>
    </div>
    )
}

