"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faUserCheck, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function HistoryComponent({ data }) {
    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
            <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
                <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6">
                    <span>
                        <FontAwesomeIcon icon={faHistory} className="h-10 w-10" /> Mechanic's History
                    </span>
                </div>

                <Accordion variant="splitted" collapsible>
                    {data.map((technician, index) => (
                        <AccordionItem
                            key={technician.id}
                            title={
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={technician.technicians_image}
                                            alt={technician.technicians_name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="text-lg font-medium text-gray-800">
                                            {technician.technicians_name}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {technician.status === 'active' ? (
                                            <span className="flex items-center text-green-600 font-bold">
                                                <FontAwesomeIcon icon={faUserCheck} className="w-4 h-4 mr-1" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-red-600 font-bold">
                                                <FontAwesomeIcon icon={faUserXmark} className="w-4 h-4 mr-1" />
                                                Banned
                                            </span>
                                        )}
                                    </div>
                                </div>
                            }
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p><strong>Phone:</strong> {technician.phone}</p>
                                        <p><strong>Emergency Contact:</strong> {technician.emergency_contact}</p>
                                        <p><strong>National ID:</strong> {technician.national_id}</p>
                                        <p><strong>Current Address:</strong> {technician.current_address}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p><strong>Experience Level:</strong> {technician.experience_level}</p>
                                        <p><strong>Work History:</strong> {technician.work_history}</p>
                                        <p><strong>Current Jobs:</strong> {technician.current_jobs}</p>
                                        <p><strong>Complaint Count:</strong> {technician.complaint_count}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-bold text-gray-800">Technician Details:</h4>
                                    <p><strong>Email:</strong> {technician.technicians_email}</p>
                                    <p><strong>PDPA Consent:</strong> {technician.pdpa_consent ? 'Given' : 'Not Given'}</p>
                                    <p><strong>Documents:</strong> <a href={`${process.env.NEXT_PUBLIC_BASE_API}/file/${technician.documents}`} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{technician.documents}</a></p>
                                </div>
                            </div>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
