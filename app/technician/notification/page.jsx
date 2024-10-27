import React from 'react';
import Notification from '@/components/technician/Notification';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return null;
    }

    return <Notification userId={session.user._id} />;
}
