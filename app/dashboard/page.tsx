'use client';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { AdminPanel } from '../../components/dashboard/AdminPanel';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { UserProfile } from '../../components/dashboard/UserProfile';

export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();


    const userRoles = session?.user?.roles || [];
    const isAdmin = userRoles.includes('admin');

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader user={session?.user} onSignOut={() => router.push('/')} />

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className={isAdmin ? 'lg:col-span-2' : 'lg:col-span-3'}>
                        <UserProfile user={session?.user} />
                    </div>

                    {isAdmin && (
                        <div className="lg:col-span-1">
                            <AdminPanel />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}