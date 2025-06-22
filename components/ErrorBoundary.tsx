'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error Boundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // Send to error reporting service
        // Example: Sentry.captureException(error, { contexts: { errorInfo } });
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                            <svg
                                className="w-6 h-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                            </svg>
                        </div>

                        <div className="mt-4 text-center">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Bir Hata Oluştu
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Üzgünüz, beklenmeyen bir hata meydana geldi. Sayfayı yenilemeyi deneyin.
                            </p>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mt-4 text-left">
                                    <summary className="cursor-pointer text-sm font-medium text-gray-700">
                                        Hata Detayları (Geliştirme Modu)
                                    </summary>
                                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </details>
                            )}

                            <div className="mt-6 flex space-x-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Sayfayı Yenile
                                </button>
                                <button
                                    onClick={() => (window.location.href = '/')}
                                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Ana Sayfaya Git
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// HOC for easier usage
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: ReactNode
) {
    return function WithErrorBoundaryComponent(props: P) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
} 