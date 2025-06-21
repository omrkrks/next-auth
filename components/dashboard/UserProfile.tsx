'use client';
import { User } from 'next-auth';

interface UserProfileProps {
    user: User | undefined;
}

export function UserProfile({ user }: UserProfileProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profil Bilgileri</h2>

            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    {user?.image && (
                        <img
                            src={user.image}
                            alt={user.name || 'User'}
                            className="w-16 h-16 rounded-full"
                        />
                    )}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Oturum Bilgileri</h4>
                    <div className="bg-gray-50 rounded p-3">
                        <pre className="text-xs text-gray-600 overflow-x-auto">
                            {JSON.stringify(user, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
} 