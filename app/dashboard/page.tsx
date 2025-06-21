'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <p>Yükleniyor...</p>;
    }

    if (!session) {
        router.push('/');
        return null;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p>Hoş geldin {session.user?.name}!</p>
        </main>
    );
}