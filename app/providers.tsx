'use client';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider
            // Session'ı 5 dakikada bir kontrol et
            refetchInterval={5 * 60}
            // Sayfa focus'a geldiğinde session'ı kontrol et  
            refetchOnWindowFocus={true}
            // Başlangıçta session'ı daha hızlı yükle
            refetchWhenOffline={false}
        >
            {children}
        </SessionProvider>
    );
}