"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFileAlt, faTasks, faStar, faUserEdit, faClipboardCheck, faSignOutAlt, faHome, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { faUpwork } from '@fortawesome/free-brands-svg-icons';

// Function to fetch review data based on user id
const getData = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/${id}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch review data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching review data:", error);
        return null;
    }
};

export default function ManuBer() {
    const { data: session, status } = useSession();
    const [dataReview, setDataReview] = useState(null); // State to store fetched review data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const router = useRouter();
    const pathname = usePathname();

    const excludedPaths = ["/login", "/role", "/technician/register", "/impervious"];

    // Fetch review data when session is available
    useEffect(() => {
        if (session) {
            const fetchReviewData = async () => {
                setLoading(true); // Start loading
                const reviewData = await getData(session.user._id); // Fetch data using user id
                setDataReview(reviewData); // Set the data to state
                setLoading(false); // Stop loading
            };
            fetchReviewData();
        }
    }, [session]);

    useEffect(() => {
        if (!session && !excludedPaths.some((path) => pathname.startsWith(path))) {
            localStorage.setItem("previousPath", pathname);
        }
    }, [pathname, session, excludedPaths]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    if (!session || excludedPaths.some((path) => pathname.startsWith(path))) {
        return null; // Hide menu for excluded paths or if session is unavailable
    }

    const canView = (role, allowedRoles) => allowedRoles.includes(role);
    const userRole = session.user.role;

    const isActive = (path) => {
        return pathname === path ? 'bg-gradient-to-tr from-blue-800 to-purple-700 text-white' : '';
    };

    return (
        <main>
            <button className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-gradient-to-tr from-blue-800 to-purple-700 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden">
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div id="sidebar" className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out">
                <div className="space-y-6 md:space-y-10 mt-10">
                    <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                        MTN services <span className="text-teal-600">.</span>
                    </h1>
                    <div id="profile" className="space-y-3">
                        <img src={session?.user.image} alt="Avatar user" className="w-10 md:w-16 rounded-full mx-auto" />
                        <div>
                            <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                                {session.user.name}
                            </h2>
                            <p className="text-xs text-gray-500 text-center">
                                {userRole === "T" ? "Technician" : userRole === "A" ? "Administrator" : "User"}
                            </p>
                        </div>
                    </div>
                    <div id="menu" className="flex flex-col space-y-2">

                        {/* User Menu */}
                        {canView(userRole, ['U']) && (
                            <>
                                <a onClick={() => router.push('/')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/')}`}>
                                    <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                                    <span className='ml-3'>Home</span>
                                </a>
                                <a onClick={() => router.push('/jobs')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/jobs')}`}>
                                    <FontAwesomeIcon icon={faTasks} className="w-5 h-5" />
                                    <span className='ml-3'>Submit Job</span>
                                </a>
                                <a onClick={() => router.push('/status')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/status')}`}>
                                    <FontAwesomeIcon icon={faClipboardCheck} className="w-5 h-5" />
                                    <span className='ml-3'>Job Status</span>
                                </a>
                                <a onClick={() => router.push('/review')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/review')}`}>
                                    <FontAwesomeIcon icon={faStar} className="w-5 h-5" />
                                    <span className='ml-3'>Review</span><span className='bg-red-600 px-[6px] ml-auto rounded-full text-white'>{dataReview.length}</span>
                                </a>
                            </>
                        )}

                        {/* Technician Menu */}
                        {canView(userRole, ['T']) && (
                            <>
                                <a onClick={() => router.push('/')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/')}`}>
                                    <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                                    <span className='ml-3'>Home</span>
                                </a>
                                <a onClick={() => router.push('/technician/jobs')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/technician/jobs')}`}>
                                    <FontAwesomeIcon icon={faBriefcase} className="w-5 h-5" />
                                    <span className='ml-3'>All work</span>
                                </a>
                                <a onClick={() => router.push('/technician/schedule')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/technician/schedule')}`}>
                                    <FontAwesomeIcon icon={faTasks} className="w-5 h-5" />
                                    <span className='ml-3'>Manage Schedule</span>
                                </a>
                                <a onClick={() => router.push('/technician/reports')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/technician/reports')}`}>
                                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                                    <span className='ml-3'>Reports</span>
                                </a>
                                <a onClick={() => router.push('/technician/edit-profile')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/technician/edit-profile')}`}>
                                    <FontAwesomeIcon icon={faUserEdit} className="w-5 h-5" />
                                    <span className='ml-3'>Profile</span>
                                </a>
                            </>
                        )}
                        {canView(userRole, ['A']) && (
                            <>
                                <a onClick={() => router.push('/')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/')}`}>
                                    <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                                    <span className='ml-3'>Home</span>
                                </a>
                                <a onClick={() => router.push('/admin/managecomplaint')}
                                    className={`flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer ${isActive('/technician/jobs')}`}>
                                    <FontAwesomeIcon icon={faBriefcase} className="w-5 h-5" />
                                    <span className='ml-3'>Manage Complaints</span>
                                </a>
                            </>
                        )}

                        {/* Logout */}
                        <a onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white rounded-md transition duration-150 ease-in-out cursor-pointer">
                            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                            <span className='ml-3'>Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
