import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Database connection check (opsiyonel)
        // await checkDatabaseConnection();

        // Auth0 connection check (opsiyonel)
        // await checkAuth0Connection();

        const healthData = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
            version: process.env.npm_package_version || '1.0.0',
            services: {
                auth0: 'operational',
                nextauth: 'operational',
                // database: 'operational',
            },
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
            },
        };

        return NextResponse.json(healthData, {
            status: 200,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (error) {
        console.error('Health check failed:', error);

        return NextResponse.json(
            {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 503 }
        );
    }
}

// Readiness probe (Kubernetes)
export async function HEAD() {
    return new Response(null, { status: 200 });
} 