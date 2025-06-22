'use client';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';

interface DashboardHeaderProps {
    user: User | undefined;
    onSignOut: () => void;
}

export function DashboardHeader({ user, onSignOut }: DashboardHeaderProps) {
    const handleSignOut = async () => {
        // Auth0 logout URL'ini oluştur
        const auth0LogoutUrl = new URL(`${process.env.NEXT_PUBLIC_AUTH0_ISSUER || 'https://dev-bpo5xzuig5zm2sxb.us.auth0.com'}/v2/logout`);
        auth0LogoutUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || 'N3n9kPCACU8VzNd816vdBi6gUdXScizW');
        auth0LogoutUrl.searchParams.set('returnTo', window.location.origin);

        // NextAuth session'ını temizle
        await signOut({ redirect: false });

        // Auth0 session'ını da temizlemek için Auth0 logout sayfasına yönlendir
        window.location.href = auth0LogoutUrl.toString();
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            {user?.image && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={user.image}
                                    alt={user.name || 'User'}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <span className="text-sm font-medium text-gray-700">
                                {user?.name}
                            </span>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
} 