'use client';
import { signIn } from 'next-auth/react';


const SignIn = () => {

    const handleSignIn = () => {
        // Force authentication ile Auth0'a yönlendir
        signIn('auth0', {
            callbackUrl: '/dashboard',
            // Auth0'da kullanıcı seçimi için force prompt
            prompt: 'login'
        });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Hoş Geldiniz
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Devam etmek için giriş yapın
                    </p>

                    <button
                        onClick={handleSignIn}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition hover:scale-105"
                    >
                        🔐 Auth0 ile Giriş Yap
                    </button>

                    {/* Debug Link */}

                </div>
            </div>
        </main>
    );
}

export default SignIn;