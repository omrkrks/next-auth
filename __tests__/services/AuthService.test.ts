import {
    AdminPermissionManager,
    AuthService,
    PermissionManagerFactory,
    UserPermissionManager
} from '../../lib/services/AuthService';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    describe('validateUserRole', () => {
        it('boş roller listesi için false döndürmeli', () => {
            const result = authService.validateUserRole([], 'admin');
            expect(result).toBe(false);
        });

        it('geçerli rol için true döndürmeli', () => {
            const result = authService.validateUserRole(['admin', 'user'], 'admin');
            expect(result).toBe(true);
        });

        it('geçersiz rol için false döndürmeli', () => {
            const result = authService.validateUserRole(['user'], 'admin');
            expect(result).toBe(false);
        });
    });

    describe('isAuthenticated', () => {
        it('null token için false döndürmeli', () => {
            const result = authService.isAuthenticated(null);
            expect(result).toBe(false);
        });

        it('geçerli token için true döndürmeli', () => {
            const mockToken = { sub: '123', exp: 123456789, roles: ['admin'] };
            const result = authService.isAuthenticated(mockToken);
            expect(result).toBe(true);
        });
    });

    describe('hasPermission', () => {
        it('gerekli izinlere sahip kullanıcı için true döndürmeli', () => {
            const userRoles = ['admin', 'user'];
            const requiredPermissions = ['admin'];
            const result = authService.hasPermission(userRoles, requiredPermissions);
            expect(result).toBe(true);
        });

        it('gerekli izinlere sahip olmayan kullanıcı için false döndürmeli', () => {
            const userRoles = ['user'];
            const requiredPermissions = ['admin'];
            const result = authService.hasPermission(userRoles, requiredPermissions);
            expect(result).toBe(false);
        });
    });
});

describe('PermissionManagers', () => {
    describe('AdminPermissionManager', () => {
        it('admin rolü için true döndürmeli', () => {
            const manager = new AdminPermissionManager();
            const result = manager.checkPermission(['admin']);
            expect(result).toBe(true);
        });

        it('admin rolü olmayan için false döndürmeli', () => {
            const manager = new AdminPermissionManager();
            const result = manager.checkPermission(['user']);
            expect(result).toBe(false);
        });
    });

    describe('UserPermissionManager', () => {
        it('user rolü için true döndürmeli', () => {
            const manager = new UserPermissionManager();
            const result = manager.checkPermission(['user']);
            expect(result).toBe(true);
        });

        it('admin rolü için de true döndürmeli', () => {
            const manager = new UserPermissionManager();
            const result = manager.checkPermission(['admin']);
            expect(result).toBe(true);
        });
    });

    describe('PermissionManagerFactory', () => {
        it('admin tipi için AdminPermissionManager döndürmeli', () => {
            const manager = PermissionManagerFactory.create('admin');
            expect(manager).toBeInstanceOf(AdminPermissionManager);
        });

        it('user tipi için UserPermissionManager döndürmeli', () => {
            const manager = PermissionManagerFactory.create('user');
            expect(manager).toBeInstanceOf(UserPermissionManager);
        });

        it('geçersiz tip için error fırlatmalı', () => {
            expect(() => {
                PermissionManagerFactory.create('invalid' as 'user' | 'admin');
            }).toThrow('Unknown permission type: invalid');
        });
    });
}); 