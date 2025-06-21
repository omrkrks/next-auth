// 12 Factor App Configuration Management
// III. Config - Store config in the environment

interface AuthConfig {
    auth0ClientId: string;
    auth0ClientSecret: string;
    auth0Issuer: string;
    nextAuthUrl: string;
    nextAuthSecret: string;
    nodeEnv: string;
}

interface DatabaseConfig {
    url?: string;
    maxConnections?: number;
}

interface AppConfig {
    auth: AuthConfig;
    database: DatabaseConfig;
    app: {
        port: number;
        environment: string;
        logLevel: string;
    };
}

class ConfigValidator {
    static validateAuthConfig(config: Partial<AuthConfig>): void {
        const required = [
            'auth0ClientId',
            'auth0ClientSecret',
            'auth0Issuer',
            'nextAuthUrl',
            'nextAuthSecret'
        ];

        for (const field of required) {
            if (!config[field as keyof AuthConfig]) {
                throw new Error(`Missing required auth configuration: ${field}`);
            }
        }
    }
}

class AppConfigBuilder {
    private config: Partial<AppConfig> = {};

    setAuth(auth: AuthConfig): AppConfigBuilder {
        this.config.auth = auth;
        return this;
    }

    setDatabase(database: DatabaseConfig): AppConfigBuilder {
        this.config.database = database;
        return this;
    }

    setApp(app: AppConfig['app']): AppConfigBuilder {
        this.config.app = app;
        return this;
    }

    build(): AppConfig {
        if (!this.config.auth) {
            throw new Error('Auth configuration is required');
        }

        ConfigValidator.validateAuthConfig(this.config.auth);

        return {
            auth: this.config.auth,
            database: this.config.database || {},
            app: this.config.app || {
                port: 3000,
                environment: 'development',
                logLevel: 'info'
            }
        };
    }
}

// Environment-based configuration loading
export function loadAppConfig(): AppConfig {
    const authConfig: AuthConfig = {
        auth0ClientId: process.env.AUTH0_CLIENT_ID || '',
        auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET || '',
        auth0Issuer: process.env.AUTH0_ISSUER || '',
        nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
        nodeEnv: process.env.NODE_ENV || 'development'
    };

    const databaseConfig: DatabaseConfig = {
        url: process.env.DATABASE_URL,
        maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10')
    };

    const appConfig = {
        port: parseInt(process.env.PORT || '3000'),
        environment: process.env.NODE_ENV || 'development',
        logLevel: process.env.LOG_LEVEL || 'info'
    };

    return new AppConfigBuilder()
        .setAuth(authConfig)
        .setDatabase(databaseConfig)
        .setApp(appConfig)
        .build();
}

export { ConfigValidator, type AppConfig, type AuthConfig };
