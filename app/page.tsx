'use client';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  const userRoles = session?.user?.roles || [];
  const isAdmin = userRoles.includes('admin');

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

  // Authenticated state - giriş yapmış
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">


        <div className={'lg:col-span-3'}>
          <UserProfile user={session?.user} />
        </div>

        <div className="space-y-4">
          {isAdmin && <a
            href="/dashboard"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition hover:scale-105"
          >
            📊 Dashboard&apos;a Git
          </a>}

          <button
            onClick={handleSignOut}
            className="w-full px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition hover:scale-105"
          >
            🚪 Çıkış Yap
          </button>
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            Roller: {session?.user?.roles?.join(', ') || 'user'}
          </p>
        </div>
      </div>
    </main>
  );
}