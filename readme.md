# 🚀 Zone01 Profile - GraphQL & Data Visualization

Welcome to the **Zone01 Profile** project! This is a high-performance, single-page application (SPA) built to fetch, process, and visualize student data directly from the school's GraphQL engine. The project emphasizes clean UI/UX, secure JWT authentication, and custom-built SVG statistics.

🌐 **Live Demo:** [imazighene.netlify.app](https://imazighene.netlify.app)

---

## 🛠️ Features

- **Secure Authentication**: Custom login system using JWT (JSON Web Tokens) with support for both username and email credentials.
- **GraphQL Integration**: Dynamic data fetching using nested queries and arguments to retrieve profile info, XP transactions, and audit results.
- **Custom SVG Data Visualization**:
    - **XP Progression**: A responsive line chart showing cumulative growth over time.
    - **Audit Ratio**: A dynamic donut chart representing success vs. failure rates.
- **High Performance**: Optimized rendering achieving a smooth 60 FPS experience without heavy external frameworks.
- **Responsive Design**: Fully adaptable UI that works seamlessly on mobile, tablet, and desktop.

---

## 🚀 Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3.
- **API**: GraphQL (Zone01 Oujda Endpoint).
- **Security**: JWT Bearer Authentication & Base64 Credential Encoding.
- **Visuals**: Scalable Vector Graphics (SVG) for math-based charting.
- **Hosting**: Netlify.

---

## 📊 Data Insights

The application queries the following metrics from the school's database:
- **Identification**: Login, Full Name, and Avatar.
- **Total XP**: Real-time calculation and formatting (KB/MB).
- **Audit Ratio**: Detailed success/fail stats.
- **Project History**: Chronological progression of completed modules.

---
## 🏗️ Project Structure
```text
├── img/
│   ├── graph.ico       # Application icons
│   └── logo.ico
├── js/
│   ├── api/
│   │   ├── auth.js  # JWT authentication & Fetc logic
│   │   └── query.js # GraphQL Query definitions
│   │     
│   ├── ui/
│   │   ├── chart.js    # Dashboard orchestration
│   │   ├── dom.js      # Login UI & View management
│   │   ├── logout.js   # Session termination logic
│   │   └── svg.js      # SVG Math & Chart generation
│   ├── utils/
│   │   └── helpers.js  # Reusable UI helpers (Popups, etc.)
│   └── main.js         # Application entry point & Routing
├── index.html          # Main HTML entry
├── style.css           # Global styles & Animations
└── readme.md           # Project documentation 
 ```
---
## 👨‍💻 Author
Othmane Benmbarek

Full-stack Student at Zone01 Oujda