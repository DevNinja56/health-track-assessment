# Medical Cases Test - Vite Project Setup

This project provides a minimal setup to get a React application working with Vite, including environment configuration for a REST API endpoint and Firebase services.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

### Environment Configuration

Create a `.env` file in the root directory of the project and add the following environment variables. Replace the placeholder values with your actual configuration.

```env
VITE_PUBLIC_REST_API_ENDPOINT="http://localhost:5000"
VITE_PUBLIC_FIREBASE_API_KEY=""
VITE_PUBLIC_FIREBASE_AUTH_DOMAIN=""
VITE_PUBLIC_FIREBASE_PROJECT_ID=""
VITE_PUBLIC_FIREBASE_STORAGE_BUCKET=""
VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
VITE_PUBLIC_FIREBASE_APP_ID=""
VITE_PUBLIC_FIREBASE_MEASUREMENT_ID=""
```

**All Files:**

```

📁 client
├── 📂 node_modules
├── 📂 public
├── 📂 src
│   ├── 📁 components
│   │   ├── 📄 AddDocument.tsx
│   │   ├── 📄 AddNote.tsx
│   │   ├── 📄 AddPrescription.tsx
│   │   ├── 📄 CreateCase.tsx
│   │   ├── 📄 Toggle.tsx
│   ├── 📁 config
│   │   ├── 📄 Api_Endpoints.ts
│   │   ├── 📄 firebaseConfig.ts
│   │   ├── 📄 routes.ts
│   ├── 📁 hook
│   │   ├── 📄 auth.ts
│   ├── 📁 interfaces
│   │   ├── 📄 index.ts
│   ├── 📁 layout
│   │   ├── 📄 Header.tsx
│   │   ├── 📄 index.tsx
│   ├── 📁 pages
│   │   ├── 📄 AuthScreen.tsx
│   │   ├── 📄 CaseList.tsx
│   │   ├── 📄 CreateMedicalCase.tsx
│   │   ├── 📄 TrackCaseProgress.tsx
│   ├── 📁 routes
│   │   ├── 📄 index.ts
│   ├── 📁 style
│   │   ├── 📄 index.css
│   ├── 📁 utils/axios
│   │   ├── 📄 fetch.ts
│   │   ├── 📄 index.ts
│   ├── 📄 App.tsx
│   ├── 📄 main.tsx
│   ├── 📄 vite-env.d.ts
├── 📄 .env
├── 📄 .env.example
├── 📄 .eslintrc.cjs
├── 📄 .gitignore
├── 📄 index.html
├── 📄 package.json
├── 📄 postcss.config.cjs
├── 📄 README.md
├── 📄 tailwind.config.js
├── 📄 tsconfig.app.json
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
├── 📄 vite.config.ts
├── 📄 yarn.lock