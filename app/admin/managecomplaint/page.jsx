import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseMedical, faCirclePlus, faTimeline } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
const getData = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/${id}`, {
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

export default async function Page() {
    const session = await getServerSession(authOptions);
    // Close modal and refresh data
    const handleAddJob=()=>{

    }
    const handleCompaintHistories=()=>{
    }
    const handleClose = () => {
    };
    if (!session) {
        return null;
    }

    const data = await getData(session.user._id);
    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
            <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
                <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6 flex">
                    <div className="w-full m-auto">
                        <span>
                            <FontAwesomeIcon icon={faBriefcaseMedical} className="h-10 w-10" /> Submit Job
                        </span>
                    </div>
                    <div className="w-full text-end gap-2 flex justify-end">
                    <Button
                            startContent={<FontAwesomeIcon icon={faTimeline} className="h-5 w-5 mx-[10px]" />}
                            
                            color="default"
                            auto
                        >
                            My Complaints
                    </Button>
                        <Button
                            startContent={<FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" />}
                        
                            color="primary"
                            auto
                        >
                            Add Job
                        </Button>
                    </div>
                </div>
                <div className="flex gap-12 justify-center">
                    <div className="bg-gray-50 p-10 rounded-xl shadow-md text-center w-full">
this is table
                    </div>
                </div>
            </div>
        </div>
    );
}
