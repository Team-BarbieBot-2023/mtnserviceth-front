import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Schedule from '@/components/technician/Schedule';

const getData = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs/schedule/${id}`, {
            method: 'GET',
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
    const session = await getServerSession(authOptions);

    if (!session) {
        return null;
    }

    const initialData = await getData(session.user._id);

    return (
        <Schedule initialData={initialData} userId={session.user._id} />
    );
}
