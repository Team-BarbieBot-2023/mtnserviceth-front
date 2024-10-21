import Jobs from '@/components/technician/Jobs';

const getData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/`, {
      method: 'GET',
      cache: 'no-store',
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

  if (!data) {
    return <div>Error loading data</div>;
  }

  return (
    <Jobs data={data} />
  );
}
