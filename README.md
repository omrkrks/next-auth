# Auth0 + NextAuth JWT Authentication System

Modern, güvenli ve ölçeklenebilir kimlik doğrulama sistemi. SOLID prensipleri ve 12 Factor App metodolojisine uygun olarak geliştirilmiştir.

## 🚀 Özellikler

- **OAuth 2.0 / OpenID Connect** ile Auth0 entegrasyonu
- **JWT tabanlı oturum yönetimi** ile NextAuth.js
- **Role-based access control (RBAC)** sistemi
- **Next.js 14+ App Router** desteği
- **TypeScript** ile type-safe geliştirme
- **TailwindCSS** ile modern UI
- **SOLID prensipleri** uygulaması
- **12 Factor App** metodolojisi
- **Docker** konteyner desteği
- **Jest** ile unit testler
- **Middleware** ile sayfa koruması
- **Multi-account support** - Çıkış sonrası farklı hesap seçimi

## 🛠️ Teknolojiler

- Next.js 14+ (App Router)
- NextAuth.js v4
- Auth0 (OAuth Provider)
- TypeScript
- TailwindCSS
- Jest (Testing)
- Docker & Docker Compose

## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn
- Auth0 hesabı
- Docker (opsiyonel)

## ⚙️ Kurulum

### 1. Projeyi klonlayın
\`\`\`bash
git clone https://github.com/your-username/next-auth-project.git
cd next-auth-project
\`\`\`

### 2. Bağımlılıkları yükleyin
\`\`\`bash
npm install
\`\`\`

### 3. Environment variables'ları ayarlayın
\`.env.local\` dosyası oluşturun:

\`\`\`env
# Auth0 Configuration
AUTH0_CLIENT_ID=N3n9kPCACU8VzNd816vdBi6gUdXScizW
AUTH0_CLIENT_SECRET=6tFPCn-20SBbV-2AdcTiSZmj7fpeWpUbH71aQnrObgce6ZyHp_g8WQhp9tE_0HHt
AUTH0_ISSUER=https://dev-bpo5xzuig5zm2sxb.us.auth0.com

# Auth0 Public (Client-side için)
NEXT_PUBLIC_AUTH0_CLIENT_ID=N3n9kPCACU8VzNd816vdBi6gUdXScizW
NEXT_PUBLIC_AUTH0_ISSUER=https://dev-bpo5xzuig5zm2sxb.us.auth0.com

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=ajskdhfmasdbgmasdmgasdöfmnasdmgnmsdngmönasdmögnmasdngmöasngmönasdmgö

# Environment
NODE_ENV=development
\`\`\`

### 4. Auth0 Konfigürasyonu

1. [Auth0 Dashboard](https://manage.auth0.com/) 'a gidin
2. Yeni bir Application oluşturun
3. Application Type: Regular Web Application
4. Allowed Callback URLs: \`http://localhost:3000/api/auth/callback/auth0\`
5. Allowed Logout URLs: \`http://localhost:3000\`
6. Client ID ve Client Secret'ı \`.env.local\` dosyasına ekleyin

#### Multi-Account Support için Auth0 Ayarları
Auth0 Dashboard'da Application Settings bölümünde:
- **Force Login**: Enabled
- **Skip Consent**: Disabled (kullanıcı seçimi için)

#### Custom Claims (Roller için)
Auth0 Actions → Flows → Login bölümünde yeni bir Action oluşturun:

\`\`\`javascript
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://omerkarakas.com/';
  
  // Kullanıcı rollerini belirle
  let userRoles = ['user'];
  
  // Admin kullanıcıları için özel kontrol
  const adminEmails = [
    'omerkarakas090@gmail.com',
    'admin@example.com'
  ];
  
  if (adminEmails.includes(event.user.email)) {
    userRoles.push('admin');
  }
  
  // Custom claims'leri token'lara ekle
  api.idToken.setCustomClaim(\`\${namespace}roles\`, userRoles);
  api.accessToken.setCustomClaim(\`\${namespace}roles\`, userRoles);
};
\`\`\`

## 🚀 Çalıştırma

### Development
\`\`\`bash
npm run dev
\`\`\`

### Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Docker ile
\`\`\`bash
# Build
npm run docker:build

# Run
npm run docker:run

# Docker Compose ile
npm run docker:compose
\`\`\`

## 🔄 Multi-Account Özelliği

Bu sistem çoklu hesap desteği sunar:

### ✅ **Çıkış Sonrası Hesap Değişimi:**
- Kullanıcı çıkış yaptığında hem NextAuth hem Auth0 session'ı temizlenir
- Tekrar giriş yaparken Auth0 login ekranı gösterilir
- Farklı email veya provider seçimi yapılabilir
- Force authentication ile cache bypass

### ✅ **Desteklenen Provider'lar:**
- Google
- Microsoft
- Facebook
- GitHub
- LinkedIn
- Auth0 Database (Email/Password)

### 🔧 **Teknik Detaylar:**
- \`prompt: "login"\` parameter ile force authentication
- Auth0 logout URL ile complete session termination
- NextAuth callbacks ile seamless integration

## 🧪 Testler

\`\`\`bash
# Testleri çalıştır
npm test

# Watch mode
npm run test:watch

# Coverage raporu
npm run test:coverage
\`\`\`

## 📁 Proje Yapısı

\`\`\`
next-auth-project/
├── app/                          # Next.js App Router
│   ├── api/auth/[...nextauth]/   # NextAuth API routes
│   ├── api/health/               # Health check endpoint
│   ├── auth/error/               # Auth error sayfası
│   ├── dashboard/                # Korumalı dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Ana sayfa
│   └── providers.tsx             # SessionProvider
├── components/                   # React bileşenleri
│   ├── dashboard/               # Dashboard bileşenleri
│   └── ErrorBoundary.tsx        # Error boundary
├── lib/                         # Utility libraries
│   ├── config/                  # 12 Factor App config
│   └── services/                # SOLID services
├── middleware.ts                # Next.js middleware
├── types/                       # TypeScript type definitions
├── __tests__/                   # Jest test dosyaları
├── .github/workflows/           # CI/CD pipeline
├── Dockerfile                   # Docker konfigürasyonu
├── docker-compose.yml          # Docker Compose
└── README.md                   # Bu dosya
\`\`\`

## 🔐 Güvenlik Özellikleri

- **JWT Token Validation**: Her istekte token doğrulaması
- **Role-based Access Control**: Sayfa erişimi rol kontrolü
- **Secure Cookies**: HttpOnly ve Secure cookie ayarları
- **CSRF Protection**: NextAuth.js built-in CSRF koruması
- **Environment Variables**: Hassas bilgilerin env'de saklanması
- **Session Termination**: Complete logout with Auth0 session clearing
- **XSS Protection**: Security headers ile korunma

## 🎯 Multi-Account Kullanım Senaryoları

### 👤 **Senaryo 1: Aynı kişinin farklı email'leri**
1. \`kullanici@gmail.com\` ile giriş
2. Çıkış yap
3. \`kullanici@hotmail.com\` ile giriş
4. ✅ Her ikisi de aynı dashboard'a erişir

### 🏢 **Senaryo 2: Paylaşılan bilgisayar**
1. Kullanıcı A giriş yapar
2. Çıkış yapar (tam session temizleme)
3. Kullanıcı B farklı provider ile giriş yapar
4. ✅ Kullanıcı A'nın bilgileri görünmez

### 👨‍💼 **Senaryo 3: Admin/User rol değişimi**
1. Normal kullanıcı olarak giriş
2. Çıkış yap
3. Admin hesabı ile giriş
4. ✅ Admin panel erişimi kazanılır

## 📊 SOLID Prensipleri

- **Single Responsibility**: Her class tek sorumluluğa sahip
- **Open/Closed**: Extension için açık, modification için kapalı
- **Liskov Substitution**: Interface implementasyonları değiştirilebilir
- **Interface Segregation**: Küçük, özel interface'ler
- **Dependency Inversion**: Abstraction'lara bağımlılık

## 🏗️ 12 Factor App Metodolojisi

1. **Codebase**: Tek codebase, multiple deploys
2. **Dependencies**: Bağımlılıklar açıkça tanımlanmış
3. **Config**: Konfigürasyon environment'ta
4. **Backing Services**: Attached resources olarak
5. **Build, Release, Run**: Ayrık aşamalar
6. **Processes**: Stateless process'ler
7. **Port Binding**: Service export via port binding
8. **Concurrency**: Scale out via process model
9. **Disposability**: Fast startup ve graceful shutdown
10. **Dev/Prod Parity**: Development ve production similarity
11. **Logs**: Treat logs as event streams
12. **Admin Processes**: Admin tasks as one-off processes

## 🔄 CI/CD Pipeline

\`\`\`yaml
# .github/workflows/ci.yml örneği
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
\`\`\`

## 📝 API Endpoints

- \`GET /api/auth/signin\` - Giriş sayfası
- \`POST /api/auth/callback/auth0\` - Auth0 callback
- \`GET /api/auth/signout\` - Çıkış
- \`GET /api/auth/session\` - Oturum bilgisi
- \`GET /api/health\` - Health check

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Değişikliklerinizi commit edin (\`git commit -m 'Add amazing feature'\`)
4. Branch'inizi push edin (\`git push origin feature/amazing-feature\`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Sorun Giderme

### Yaygın Sorunlar

1. **Auth0 bağlantı sorunu**: Environment variables'ları kontrol edin
2. **JWT token hataları**: NEXTAUTH_SECRET'ın ayarlandığından emin olun
3. **Rol tabanlı erişim sorunu**: Auth0 Actions ayarlarını kontrol edin
4. **Multi-account çalışmıyor**: NEXT_PUBLIC_* env variables'larını kontrol edin

### Multi-Account Debugging

\`\`\`bash
# Browser Console'da Auth0 logout URL'ini kontrol edin
console.log('Auth0 Logout URL:', window.location.href);

# Network tab'ında Auth0 requests'leri kontrol edin
# - /v2/logout endpoint'ine istek gitmeli
# - prompt=login parameter'ı olmalı
\`\`\`

### Loglama

Development environment'ta detaylı loglar için:
\`\`\`env
LOG_LEVEL=debug
\`\`\`

## 📞 İletişim

Sorularınız için:
- GitHub Issues: [Proje Issues](https://github.com/omrkrks/next-auth-project/issues)
- Email: omerkarakas090@gmail.com


//