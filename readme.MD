# BRUR Assignment & Report Cover Page Generator (React + Vite)

A modern, responsive web application built with **React** and **Vite** to generate professional, print-ready cover pages for Begum Rokeya University, Rangpur (BRUR).

It features a tabbed wizard form, live interactive A4 paper preview, vector-based PDF generation (with 3cm binding margin support), and localStorage auto-save.

---

## Features

- **Modern Glassmorphic UI:** Clean, polished design matching BRUR branding with smooth transitions.
- **Tabbed Wizard Form:** 4 organized steps (Document, Academic, Teacher, and Student).
- **Progress Tracking:** Live form completion indicator bar.
- **Real-Time A4 Live Preview:** Interactive preview accurately rendered with A4 proportions and responsive scaling.
- **3cm Left Binding Margin:** Dedicated toggle for 3cm (30mm) left margin for hole-punching and spiral binding.
- **Crisp Vector PDF Export:** High-resolution vector PDF using `jsPDF` without blurry screenshot rasterization.
- **Auto-Save & Restore:** Automatically saves form state to `localStorage` so input is never lost on refresh.
- **Faculty & Department Mapping:** Automatically populates departments based on the chosen faculty, with support for custom inputs.
- **No Backend Required:** 100% client-side application.

---

## Project Structure

```
brur-assignment-generator/
├── public/
│   └── assets/
│       └── brur-logo.png            # BRUR official logo asset
├── src/
│   ├── components/
│   │   ├── AcademicPanel.jsx        # Faculty and department selection
│   │   ├── ActionButtons.jsx        # Download PDF and Reset controls
│   │   ├── DocumentPanel.jsx        # Document type, topic, course details, 3cm margin
│   │   ├── Footer.jsx               # Footer and credit info
│   │   ├── FormCard.jsx             # Multi-tab form container with navigation
│   │   ├── Header.jsx               # University title, branding, and logo
│   │   ├── PreviewStage.jsx         # Live A4 paper preview with ResizeObserver
│   │   ├── Progress.jsx             # Form completion bar
│   │   ├── StudentPanel.jsx         # Student information and submission date
│   │   ├── Tabs.jsx                 # Sliding indicator tab navigation
│   │   ├── TeacherPanel.jsx         # Teacher details and designation
│   │   └── Toast.jsx                # Animated toast notifications
│   ├── constants/
│   │   └── academicData.js          # BRUR faculties, departments, designations
│   ├── styles/
│   │   └── main.css                 # Glassmorphic, responsive, and A4 print styles
│   ├── utils/
│   │   ├── dateUtils.js             # Date formatting and ISO helpers
│   │   ├── pdfGenerator.js          # jsPDF vector PDF engine & export logic
│   │   └── storage.js               # LocalStorage state management
│   ├── App.jsx                      # Main application component
│   └── main.jsx                     # Vite React entry point
├── index.html                       # HTML template with Google Fonts
├── package.json                     # Project dependencies and npm scripts
├── vite.config.js                   # Vite React plugin configuration
└── .gitignore                       # Git ignore file
```

---

## Setup & Running Locally

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd brur-assignment-generator

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## Author

Developed by **Alif** · BRUR CSE 16
