# 🖥️ **OS Style Portfolio**

Welcome to my OS-style portfolio repository! 🚀 This project is a unique digital experience that brings the familiarity of an operating system interface to showcase my skills, projects, and passion for modern web development.

![Portfolio Preview](public/web-preview.png)

---

## 🛠️ **Technologies & Tools**

This portfolio leverages cutting-edge technologies to deliver an exceptional user experience:

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Motion-12.24.7-FF0080?style=for-the-badge&logo=framer&logoColor=white)

- **[Next.js](https://nextjs.org/)**: Powerful React framework for server-side rendering and static site generation.
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript for robust code.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for stunning designs.
- **[Motion](https://www.framer.com/motion/)**: Smooth animations and transitions for delightful interactions.
- **[Radix UI](https://www.radix-ui.com/)**: Accessible and customizable UI components.
- **[shadcn/ui](https://ui.shadcn.com/)**: Beautiful component library built on Radix UI.

---

## ✨ **Features**

- 🚀 **Boot Screen Experience**: Authentic OS-style startup sequence
- 🖥️ **Desktop Environment**: Fully interactive OS interface with window management
- 📱 **Dynamic Dock**: Quick access to all applications with smooth animations
- 🎯 **Interactive Applications**:
  - 💼 **About Me**: Comprehensive profile with skills, experience, and education
  - 📄 **Resume**: Professional resume viewer
  - 🌐 **Browser**: Functional web browser component
  - 💻 **Terminal**: Interactive command-line interface
  - 🎨 **Paint**: Drawing application
  - 🎮 **Games**: Flappy Bird and Snake games built-in
  - ☁️ **Weather**: Live weather information
  - 🎵 **Vibe**: Coming soon
  - 📹 **FaceTime**: Video call interface
  - 👨‍💻 **VS Code**: Code editor theme
- 🎨 **Modern UI**: Clean, responsive design with dark theme
- ⚡ **High Performance**: Optimized for speed and efficiency
- 🌀 **Smooth Animations**: Seamless transitions powered by Motion
- 🔍 **Spotlight Search**: Quick app launcher with search functionality
- 📊 **Menu Bar**: Functional top menu with system information
- 🎯 **Launchpad**: Grid view of all applications

---

## 🚀 **Getting Started**

Follow these steps to set up the project locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/Prince-695/my-portfolio.git
cd my-portfolio
```

### **2. Install Dependencies**
```bash
bun install
```

### **3. Start the Development Server**
```bash
bun run dev
```

Your portfolio will be live at **http://localhost:3000**. 🎉

### **4. Build for Production**
```bash
bun run build
```

### **5. Start Production Server**
```bash
bun start
```

---

## 📦 **Project Structure**

```
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page
│   └── not-found.tsx            # 404 page
├── components/                   # React Components
│   ├── apps/                    # Application Components
│   │   ├── aboutMe.tsx          # About Me application
│   │   ├── browser.tsx          # Web browser
│   │   ├── facetime.tsx         # FaceTime app
│   │   ├── flappybird.tsx       # Flappy Bird game
│   │   ├── paint.tsx            # Paint application
│   │   ├── resume.tsx           # Resume viewer
│   │   ├── snake.tsx            # Snake game
│   │   ├── terminal.tsx         # Terminal emulator
│   │   ├── vibe.tsx             # Vibe - coming soon
│   │   ├── vscode.tsx           # VS Code theme
│   │   ├── weather.tsx          # Weather app
│   │   └── about/               # About Me sections
│   │       ├── AboutSection.tsx
│   │       ├── AchievementsSection.tsx
│   │       ├── EducationSection.tsx
│   │       ├── ExperienceSection.tsx
│   │       └── SkillsSection.tsx
│   ├── ui/                      # UI Components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...                  # Other UI components
│   ├── boot-screen.tsx          # Boot animation
│   ├── desktop.tsx              # Desktop environment
│   ├── Dock.tsx                 # Application dock
│   ├── icon.tsx                 # App icons
│   ├── launchpad.tsx            # App launcher
│   ├── MainText.tsx             # Main text component
│   ├── Menubar.tsx              # Top menu bar
│   ├── Socials.tsx              # Social links
│   ├── spotlight.tsx            # Spotlight search
│   └── window.tsx               # Window component
├── hooks/                        # Custom React Hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   ├── use-outside-click.tsx    # Outside click handler
│   └── use-toast.ts             # Toast notifications
├── lib/                          # Utility Functions
│   └── utils.ts                 # Helper functions
├── public/                       # Static Assets
│   └── browser/                 # Browser assets
├── types.ts                      # TypeScript type definitions
└── README.md                     # You are here!
```

---

## 🎨 **Key Highlights**

- **Pixel-Perfect Design**: Every detail crafted for visual excellence
- **Component Architecture**: Modular and reusable components
- **Type Safety**: Full TypeScript implementation
- **Accessibility**: Built with Shadcn UI for WCAG compliance
- **Developer Experience**: Hot reload, TypeScript support, and modern tooling
- **Customizable**: Easy to modify and extend

---

## 🌐 **Live Demo**

Check out the live version of my portfolio: [https://princerathod.me]

---

## 📄 **License**

This project is open source and available under the MIT License.

---

<div align="center">

**Built with ❤️ using Next.js and TypeScript**

⭐ Star this repo if you find it helpful!

</div>
