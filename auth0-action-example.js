/**
 * Auth0 Post-Login Action
 * Bu dosya Auth0 Dashboard'da Actions bölümünde kullanılacak
 */

exports.onExecutePostLogin = async (event, api) => {
    const namespace = 'https://omerkarakas.com/';

    // Kullanıcı rollerini belirle
    let userRoles = [];

    // Method 1: Authorization Extension kullanıyorsanız
    if (event.authorization && event.authorization.roles) {
        userRoles = event.authorization.roles;
    }
    // Method 2: Manuel rol ataması (test için)
    else {
        // Varsayılan olarak 'user' rolü ver
        userRoles = ['user'];

        // Admin kullanıcıları için özel kontrol
        const adminEmails = [
            'omerkarakas090@gmail.com',
            'admin@example.com' // Diğer admin emailler
        ];

        if (adminEmails.includes(event.user.email)) {
            userRoles.push('admin');
        }

        // Domain bazlı rol ataması
        if (event.user.email && event.user.email.endsWith('@yourcompany.com')) {
            userRoles.push('employee');
        }
    }

    // Custom claims'leri token'lara ekle
    api.idToken.setCustomClaim(`${namespace}roles`, userRoles);
    api.accessToken.setCustomClaim(`${namespace}roles`, userRoles);

    // Debug için (production'da kaldırın)
    console.log('User roles assigned:', userRoles);
};

/**
 * Auth0'da bu Action'ı kullanmak için:
 * 
 * 1. Auth0 Dashboard → Actions → Library
 * 2. "Build Custom" butonuna tıklayın
 * 3. Yukarıdaki kodu yapıştırın
 * 4. Actions → Flows → Login
 * 5. Custom Action'ınızı flow'a sürükleyin
 * 6. "Apply" butonuna tıklayın
 * 
 * Test etmek için:
 * - Uygulamanızda giriş yapın
 * - Network tab'ında Auth0 response'unu kontrol edin
 * - JWT token'ın içinde custom claims olup olmadığını kontrol edin
 */ 