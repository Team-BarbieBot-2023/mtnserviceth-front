import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faBriefcase, faComments, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-tr from-blue-800 to-purple-700 text-white px-4">
            <h1 className="text-4xl font-bold text-center mt-10 mb-6">
            <FontAwesomeIcon icon={faScrewdriverWrench} className="h-10 w-10" /> Welcome to MTN Services
            </h1>
            <p className="text-center text-lg max-w-2xl mb-10">
                Our platform offers comprehensive services for repair requests and job assignments. Whether you're looking for a technician or want to manage repair jobs efficiently, MTN Services is here to help you every step of the way.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">
                {/* Repair Request Section */}
                <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-lg">
                    <FontAwesomeIcon icon={faWrench} className="h-12 w-12 text-white mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Submit a Repair Request</h2>
                    <p className="text-center text-sm">
                        Quickly and easily submit repair requests and let us handle the rest. Our system ensures that your requests are handled promptly and efficiently.
                    </p>
                </div>

                {/* Job Management Section */}
                <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-lg">
                    <FontAwesomeIcon icon={faBriefcase} className="h-12 w-12 text-white mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Manage Your Jobs</h2>
                    <p className="text-center text-sm">
                        Track and manage all your repair jobs from a centralized dashboard. Assign tasks to technicians and monitor progress in real-time.
                    </p>
                </div>

                {/* Support Section */}
                <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-lg">
                    <FontAwesomeIcon icon={faComments} className="h-12 w-12 text-white mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
                    <p className="text-center text-sm">
                        Need help? Our dedicated support team is here to assist you with any inquiries or issues you may have. Reach out to us anytime.
                    </p>
                </div>
            </div>

            <footer className="mt-16 text-center text-sm opacity-75">
                © 2024 MTN Services. All rights reserved.
            </footer>
        </div>
    )
}
