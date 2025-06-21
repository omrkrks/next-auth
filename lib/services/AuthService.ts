import { JWT } from "next-auth/jwt";

// Interfaces (Dependency Inversion Principle)
export interface IAuthService {
    validateUserRole(userRoles: string[], requiredRole: string): boolean;
    isAuthenticated(token: JWT | null): boolean;
    hasPermission(userRoles: string[], requiredPermissions: string[]): boolean;
}

export interface IUserService {
    getUserRoles(userId: string): Promise<string[]>;
    updateUserRoles(userId: string, roles: string[]): Promise<void>;
}

// Auth Service Implementation (Single Responsibility Principle)
export class AuthService implements IAuthService {

    validateUserRole(userRoles: string[], requiredRole: string): boolean {
        if (!userRoles || userRoles.length === 0) {
            return false;
        }
        return userRoles.includes(requiredRole);
    }

    isAuthenticated(token: JWT | null): boolean {
        return token !== null && token !== undefined;
    }

    hasPermission(userRoles: string[], requiredPermissions: string[]): boolean {
        if (!userRoles || userRoles.length === 0) {
            return false;
        }

        return requiredPermissions.some(permission =>
            userRoles.includes(permission)
        );
    }
}

// Permission Manager (Open/Closed Principle)
export abstract class PermissionManager {
    abstract checkPermission(userRoles: string[]): boolean;
}

export class AdminPermissionManager extends PermissionManager {
    checkPermission(userRoles: string[]): boolean {
        return userRoles.includes('admin');
    }
}

export class UserPermissionManager extends PermissionManager {
    checkPermission(userRoles: string[]): boolean {
        return userRoles.includes('user') || userRoles.includes('admin');
    }
}

// Factory Pattern (SOLID & Clean Code)
export class PermissionManagerFactory {
    static create(permissionType: 'admin' | 'user'): PermissionManager {
        switch (permissionType) {
            case 'admin':
                return new AdminPermissionManager();
            case 'user':
                return new UserPermissionManager();
            default:
                throw new Error(`Unknown permission type: ${permissionType}`);
        }
    }
} 