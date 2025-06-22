'use client';
import { User } from 'next-auth';

interface UserProfileProps {
    user: User | undefined;
}

export function UserProfile({ user }: UserProfileProps) {
    if (!user) return null;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            {/* Başlık */}
            <h2 className="text-xl font-bold text-gray-900">👤 Profil Bilgileri</h2>

            {/* Kullanıcı Kartı */}
            <div className="flex items-center gap-4">
                {user.image && (
                    <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="w-16 h-16 rounded-full border object-cover"
                    />
                )}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>
            </div>

            {/* Oturum Bilgileri */}
            <div>
                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 17v-2a4 4 0 014-4h3M9 7H5a2 2 0 00-2 2v8a2 2 0 002 2h4m6 0h4a2 2 0 002-2v-5a2 2 0 00-2-2h-4"
                        />
                    </svg>
                    Oturum Bilgileri
                </h4>

                <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Ad:</span>
                        <span className="text-gray-900">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Email:</span>
                        <span className="text-gray-900">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Kullanıcı ID:</span>
                        <span className="text-gray-900 truncate max-w-[160px] text-right">
                            {`${user.id} `}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}