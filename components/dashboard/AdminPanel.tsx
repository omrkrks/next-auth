'use client';

export function AdminPanel() {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Paneli</h2>

            <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">
                        Sistem Yönetimi
                    </h3>
                    <p className="text-blue-700 text-sm mb-3">
                        Admin rolüne sahip kullanıcılar için özel işlemler
                    </p>

                    <div className="space-y-2">
                        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                            Kullanıcı Yönetimi
                        </button>
                        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                            Sistem Ayarları
                        </button>
                        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
                            Raporlar
                        </button>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-yellow-900 mb-2">
                        İstatistikler
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-white rounded p-3">
                            <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
                            <p className="text-2xl font-bold text-gray-900">1,234</p>
                        </div>
                        <div className="bg-white rounded p-3">
                            <p className="text-sm text-gray-600">Aktif Oturumlar</p>
                            <p className="text-2xl font-bold text-gray-900">567</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 