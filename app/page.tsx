'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <button onClick={() => signIn('auth0')} className="px-4 py-2 bg-blue-600 text-white rounded">
          Giriş Yap
        </button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p>Merhaba, {session.user?.name}</p>
      <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
        Çıkış Yap
      </button>
    </main>
  );
}