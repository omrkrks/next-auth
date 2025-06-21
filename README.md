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
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_ISSUER=https://your-domain.auth0.com

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

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

#### Custom Claims (Roller için)
Auth0 Rules bölümünde yeni bir kural oluşturun:

\`\`\`javascript
function (user, context, callback) {
  const namespace = 'https://myapp.com/';
  const assignedRoles = (context.authorization || {}).roles;
  
  let idTokenClaims = context.idToken || {};
  let accessTokenClaims = context.accessToken || {};
  
  idTokenClaims[\`\${namespace}roles\`] = assignedRoles;
  accessTokenClaims[\`\${namespace}roles\`] = assignedRoles;
  
  context.idToken = idTokenClaims;
  context.accessToken = accessTokenClaims;
  
  return callback(null, user, context);
}
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
│   ├── auth/error/               # Auth error sayfası
│   ├── dashboard/                # Korumalı dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Ana sayfa
│   └── providers.tsx             # SessionProvider
├── components/                   # React bileşenleri
│   └── dashboard/               # Dashboard bileşenleri
├── lib/                         # Utility libraries
│   ├── config/                  # 12 Factor App config
│   └── services/                # SOLID services
├── middleware.ts                # Next.js middleware
├── types/                       # TypeScript type definitions
├── __tests__/                   # Jest test dosyaları
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
3. **Rol tabanlı erişim sorunu**: Auth0 Rules ayarlarını kontrol edin

### Loglama

Development environment'ta detaylı loglar için:
\`\`\`env
LOG_LEVEL=debug
\`\`\`

## 📞 İletişim

Sorularınız için:
- GitHub Issues: [Proje Issues](https://github.com/your-username/next-auth-project/issues)
- Email: your-email@example.com


//