"use client";
import MenuIcon from '@/public/icons/MenuIcon';
import DashboardIcon from '@/public/icons/DashboardIcon';
import ProductsIcon from '@/public/icons/ProductsIcon';
import ReportsIcon from '@/public/icons/ReportsIcon';
import LogoutIcon from '@/public/icons/LogoutIcon';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const excludedPaths = ["/login", "/role", "/technician/register"];

    useEffect(() => {
        if (!session && !excludedPaths.some((path) => pathname.startsWith(path))) {
            localStorage.setItem("previousPath", pathname);
        }
    }, [pathname, session, excludedPaths]);

    if (!session) {
        return null;
    }

    if (excludedPaths.some((path) => pathname.startsWith(path))) {
        return null;
    }

    return (
        <main>
            <button className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-gradient-to-tr from-blue-800 to-purple-700 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden">
                <MenuIcon />
            </button>
            <div id="sidebar" className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out">
                <div className="space-y-6 md:space-y-10 mt-10">
                    <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">MTN services<span className="text-teal-600">.</span></h1>
                    <div id="profile" className="space-y-3">
                        <img src={session?.user.image} alt="Avatar user" className="w-10 md:w-16 rounded-full mx-auto" />
                        <div>
                            <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">{session.user.name}</h2>
                            <p className="text-xs text-gray-500 text-center">{session.user.role === "T" ? "Technician" : session.user.role === "A" ? "Administrator" : "User"}</p>
                        </div>
                    </div>
                    <div id="menu" className="flex flex-col space-y-2">
                        <a
                            onClick={() => router.push('/')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out cursor-pointer"
                        >
                            <DashboardIcon />
                            <span className="">Dashboard</span>
                        </a>
                        <a
                            onClick={() => router.push('/admin')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                        >
                            <ProductsIcon />
                            <span className="">Products</span>
                        </a>
                        <a
                            onClick={() => router.push('/')}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                        >
                            <ReportsIcon />
                            <span className="">Reports</span>
                        </a>
                        <a
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-tr from-blue-800 to-purple-700 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                        >
                            <LogoutIcon />
                            <span className="">Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
