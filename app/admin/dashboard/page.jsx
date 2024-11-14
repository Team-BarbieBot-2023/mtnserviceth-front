import DashboardComponent from '@/components/admin/DashboardComponent';
import React from 'react'

const getData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/dashboard`, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch technician data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default async function Page() {
  const data = await getData();
  return (
    <DashboardComponent data={data}/>
  )
}
