# AutoXCustoms 🚗

Modern Car Service & Customization Platform

🌐 Live Website: https://auto-x-custom.vercel.app/

**AutoXCustoms** is a modern car customization and automotive service website built with **Next.js, React, TypeScript, Redux Toolkit, and Tailwind CSS**.

The platform provides customers with an engaging way to explore automotive services, browse available options, and interact with the service platform through a responsive and modern user interface.

---

## ✨ Features

- 🚗 Modern automotive service website
- 📱 Fully responsive design
- ⚡ Built with Next.js 16 and React 19
- 🎨 Tailwind CSS for modern UI development
- 🔄 Redux Toolkit for global state management
- 🔐 JWT-based authentication support
- 📝 React Hook Form for form management
- 📅 Date picker and appointment-related functionality
- 📊 Interactive charts with Recharts
- 🔔 Toast notifications and alerts
- 🎬 Smooth animations with Framer Motion
- 📄 PDF generation and document export
- 🖼️ HTML-to-canvas support
- 🔍 Pagination and data handling
- 🌐 REST API integration with Axios
- 🧹 ESLint-based code quality checks
- ⚙️ GitHub Actions CI workflow

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Redux Toolkit**
- **React Redux**

### Forms & UI

- React Hook Form
- React Datepicker
- React Icons
- Lucide React
- SweetAlert2
- React Toastify
- Framer Motion

### Data & API

- Axios
- JWT Decode
- Cookies Next
- JS Cookie
- Lodash
- Date-fns

### Reports & Visualization

- Recharts
- jsPDF
- html2canvas

### Development & Quality

- ESLint
- TypeScript
- GitHub Actions
- Node.js

---

## 📦 Dependencies

```json
{
  "next": "^16.0.8",
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "typescript": "^5",
  "tailwindcss": "^4",
  "@reduxjs/toolkit": "^2.12.0",
  "react-redux": "^9.3.0",
  "axios": "^1.19.0",
  "react-hook-form": "^7.85.0",
  "framer-motion": "^12.43.0",
  "lucide-react": "^0.562.0",
  "react-icons": "^5.5.0",
  "react-toastify": "^11.1.0",
  "sweetalert2": "^11.26.25",
  "recharts": "^3.10.1"
}
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project

```bash
cd stape-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

Add any additional environment variables required by your backend or deployment environment.

### 5. Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 📜 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm start`     | Start the production server  |
| `npm run lint`  | Run ESLint                   |

---

## 🔄 CI/CD

The project includes a **GitHub Actions** workflow that runs automatically whenever code is pushed to the repository or manually triggered.

### Workflow

```yaml
name: Ready the app for deployment

on: [push, workflow_dispatch]

jobs:
  test-code:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

### Workflow Purpose

The workflow:

1. Checks out the latest source code.
2. Sets up Node.js 18.
3. Installs project dependencies.
4. Runs the project's test suite.

> **Note:** If this project does not currently contain an `npm test` script, add one to `package.json` or change the workflow to run the appropriate validation command.

---

## 📁 Suggested Project Structure

```text
stape-frontend/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── redux/
│   ├── services/
│   ├── types/
│   └── utils/
├── .env.local
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🔐 Environment Variables

Environment variables should be stored in `.env.local` for local development.

Example:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

Do not commit sensitive credentials or private API keys to GitHub.

---

## 🎨 UI & User Experience

AutoXCustoms focuses on delivering a premium automotive experience through:

- Clean and modern layouts
- Responsive mobile, tablet, and desktop interfaces
- Smooth page transitions
- Interactive components
- Clear service presentation
- User-friendly forms
- Real-time feedback through notifications

---

## ⚡ Performance

The application takes advantage of Next.js features and modern frontend practices to provide:

- Optimized page rendering
- Component-based architecture
- Efficient state management
- API-based data fetching
- Responsive image and asset handling
- Production-ready builds

---

## 🧪 Code Quality

Run ESLint with:

```bash
npm run lint
```

Before submitting changes, make sure the project builds successfully:

```bash
npm run build
```

---

## 🚀 Deployment

The application can be deployed to platforms that support Next.js, such as:

- Vercel
- AWS
- Docker-based hosting
- Other Node.js-compatible hosting platforms

For production deployment, configure all required environment variables in the hosting platform.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes:

```bash
git commit -m "feat: add new automotive service"
```

5. Push the branch:

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## 📄 License

This project is proprietary and intended for **AutoXCustoms**.
All rights reserved.

---

## 👨‍💻 Project

**AutoXCustoms** — Automotive Services & Car Customization Platform

Built with ❤️ using **Next.js, React, TypeScript, Redux Toolkit, and Tailwind CSS**.
