'use client';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AdminPanel } from '../../components/dashboard/AdminPanel';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserProfile } from '../../components/dashboard/UserProfile';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/');
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const userRoles = session.user?.roles || [];
    const isAdmin = userRoles.includes('admin');

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader user={session.user} onSignOut={() => router.push('/')} />

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <UserProfile user={session.user} />
                    </div>

                    <div className="lg:col-span-1">
                        {isAdmin && <AdminPanel />}
                    </div>
                </div>
            </main>
        </div>
    );
}