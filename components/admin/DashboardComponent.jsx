"use client";
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardComponent({ data }) {
    const stats = data[0] || {};

    const jobStatusData = [
        { name: 'Pending', value: parseInt(stats.pending_count) },
        { name: 'Completed', value: parseInt(stats.completed_count) },
        { name: 'Canceled', value: parseInt(stats.canceled_count) },
        { name: 'In Progress', value: parseInt(stats.in_progress_count) },
    ];

    const userRoleData = [
        { name: 'Admin', value: parseInt(stats.admin_count) },
        { name: 'User', value: parseInt(stats.user_count) },
        { name: 'Technician', value: parseInt(stats.technician_count) },
    ];

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];


    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9 min-h-screen">
            <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
                <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6">
                    <span>
                        <FontAwesomeIcon icon={faDashboard} className="h-10 w-10 mr-2" /> Dashboard
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">User Roles Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={userRoleData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={(entry) => `${entry.name} (${entry.value})`}
                                >
                                    {userRoleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Job Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={jobStatusData} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-green-100 rounded-lg shadow text-center">
                        <h3 className="text-lg font-bold text-gray-700">Active Users</h3>
                        <p className="text-2xl font-semibold text-green-800">{stats.active_count}</p>
                    </div>
                    <div className="p-6 bg-red-100 rounded-lg shadow text-center">
                        <h3 className="text-lg font-bold text-gray-700">Banned Users</h3>
                        <p className="text-2xl font-semibold text-red-800">{stats.banned_count}</p>
                    </div>

                    <div className="p-6 bg-yellow-100 rounded-lg shadow text-center">
                        <h3 className="text-lg font-bold text-gray-700">Urgent Jobs</h3>
                        <p className="text-2xl font-semibold text-yellow-800">{stats.urgent_count}</p>
                    </div>
                    <div className="p-6 bg-blue-100 rounded-lg shadow text-center">
                        <h3 className="text-lg font-bold text-gray-700">Normal Jobs</h3>
                        <p className="text-2xl font-semibold text-blue-800">{stats.normal_count}</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-lg shadow text-center">
                        <h3 className="text-lg font-bold text-gray-700">Non-Urgent Jobs</h3>
                        <p className="text-2xl font-semibold text-gray-800">{stats.nothurry_count}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
