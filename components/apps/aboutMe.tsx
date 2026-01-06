"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'

export default function Notes() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format date and time
  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }
    return date.toLocaleDateString('en-US', options)
  }

  // Update the notes state with 5 sections
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "About Me",
      content: `# 👋Hello, 

# I'm Prince Rathod

### A Passionate Full Stack Web Developer & Web Designer from India.

---

- 🔭 Currently working on **myself**
- 🌱 Fluent in **MERN Stack, Next.js, TypeScript, TailwindCSS**
- 💼 Passionate about creating beautiful and functional web experiences
- 🎯 Always learning and exploring new technologies
- 🚀 Building projects that solve real-world problems
- 📫 Reach me at **[My Portfolio](https://princerathod.vercel.app/)**

##  What I Do

I specialize in building modern, responsive, and user-friendly web applications. From crafting pixel-perfect UIs to architecting robust backends, I love the entire journey of bringing ideas to life through code.

**My Approach:**
- 💡 Design-first thinking
- ⚡ Performance optimization
- 🎨 Clean, maintainable code
- 🤝 Collaborative development`,
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      title: "Skills",
      content: `# 💻 Tech Stack & Skills

## 🎨 Frontend Technologies

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) 
![Radix UI](https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white)

---

## ⚛️ Frameworks & Libraries

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) 
![tRPC](https://img.shields.io/badge/tRPC-%232596BE.svg?style=for-the-badge&logo=tRPC&logoColor=white) 
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## 🗄️ Databases & Backend

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) 
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) 
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) 
![Appwrite](https://img.shields.io/badge/Appwrite-%23FD366E.svg?style=for-the-badge&logo=appwrite&logoColor=white)

---

## 🛠️ Tools & Platforms

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) 
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) 
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) 
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220) 
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white) 
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) 
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

---

## 🎨 Design Tools

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) 
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue) 
![Sketch](https://img.shields.io/badge/Sketch-FFB387?style=for-the-badge&logo=sketch&logoColor=black)

---

## 📚 Other Languages

![C](https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white) 
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) 
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)`,
      date: "January 3, 2026",
    },
    {
      id: 3,
      title: "Achievements",
      content: `# 🏆 Achievements

## 💼 Professional Milestones
- 🎯 **Led successful migration** of legacy applications to modern tech stack
- 🚀 **Increased application performance** by 60% through optimization
- 👥 **Mentored junior developers** and established coding standards
- 📈 **Built scalable systems** serving thousands of users daily

## 🎨 Notable Projects
- 🎮 **Indie Game Development** - Created simulation games with realistic mechanics
- 🤖 **AI Integration** - Implemented ML models in production applications  
- 🌐 **Open Source Contributions** - Active contributor to popular projects
- 💻 **Full Stack Applications** - End-to-end development of enterprise solutions

## ⚡ Technical Accomplishments
- 🎨 Mastered modern frontend frameworks and patterns
- 🔧 Built robust backend systems with high availability
- 🎯 Designed intuitive user interfaces with great UX
- 📱 Created responsive applications across all devices

## 📚 Learning & Growth
- 🦀 Continuously expanding knowledge in Rust and Go
- 🧠 Deepening understanding of AI/ML frameworks
- 🎓 Self-taught in multiple programming paradigms
- 🌱 Always exploring new technologies and best practices`,
      date: "January 2, 2026",
    },
    {
      id: 4,
      title: "Experience",
      content: `# 💼 Professional Experience

## 🚀 Senior Full Stack Developer
**Current Position** | 2022 - Present

### 📋 Responsibilities
- 👨‍💻 Lead development of complex web applications
- 🏗️ Architect scalable solutions for high-traffic platforms
- 🎓 Mentor and guide development teams
- 🔄 Implement CI/CD pipelines and DevOps practices
- ✅ Code review and quality assurance

### 🎯 Key Projects
- 🔌 Built real-time collaboration tools using WebSockets
- 🌐 Developed REST and GraphQL APIs serving millions of requests
- 📦 Created reusable component libraries
- ⚡ Optimized application performance and user experience

## 💻 Full Stack Developer
**Previous Role** | 2020 - 2022

### 🔧 Focus Areas
- ⚛️ Frontend development with React and Vue
- 🔌 Backend API development with Node.js and PHP
- 🗄️ Database design and optimization
- 🔗 Third-party integrations

## 🎨 Frontend Developer
**Earlier Experience** | 2018 - 2020

### ✨ Achievements
- 🎯 Converted designs to pixel-perfect implementations
- 📱 Built responsive, mobile-first applications
- ⚡ Improved website performance scores
- 🤝 Collaborated with designers and backend teams

## 🌟 Freelance Developer
**Ongoing** | 2017 - Present

### 🛠️ Services
- 💼 Custom web application development
- 📝 WordPress and CMS solutions
- 🎮 Game development and simulations
- 🔍 Technical consulting and code audits`,
      date: "January 1, 2026",
    },
    {
      id: 5,
      title: "Credentials",
      content: `# 🎓 Credentials & Certificates

## 📜 Professional Certifications
- 🎓 **Full Stack Web Development** - Certified Developer
- ⚛️ **Advanced React & Next.js** - Expert Level
- 🔐 **Web Security Best Practices** - Security Certified
- ☁️ **AWS Cloud Practitioner** - Cloud Computing

## 💡 Technical Competencies
- 💻 **Modern JavaScript/TypeScript** - Advanced proficiency
- 🎨 **UI/UX Design Principles** - Certified designer
- 🔧 **DevOps & CI/CD** - Pipeline automation expert
- 🗄️ **Database Management** - SQL & NoSQL certified

## 📚 Continuous Learning
- 🦀 **Rust Programming** - Currently advancing skills
- 🔷 **Go Development** - Building microservices expertise
- 🤖 **AI/ML Frameworks** - Practical applications training
- 🎮 **Game Development** - Unity & Unreal Engine courses

## ⭐ Recognition & Community
- 🌟 **Open Source Contributor** - Multiple projects
- 📝 **Technical Writer** - Blog and documentation
- 🎤 **Speaker** - Tech meetups and workshops
- 🤝 **Community Member** - Active in developer communities

## 🎯 Education & Background
- 💻 **Computer Science** - Self-taught developer
- 📖 **Continuous Education** - Online courses and bootcamps
- 🚀 **Practical Experience** - 6+ years professional development
- 🛠️ **Project-Based Learning** - Hands-on real-world projects`,
      date: "December 30, 2025",
    },
  ])

  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [editableContent, setEditableContent] = useState("")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditableContent(note.content)
    }
    // Close mobile sidebar after selection
    setIsMobileSidebarOpen(false)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)

    // Update the note content
    setNotes(
      notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { ...note, content: e.target.value }
        }
        return note
      }),
    )
  }

  const textColor = "text-gray-800"
  const bgColor = "bg-white"
  const sidebarBg = "bg-gray-100"
  const borderColor = "border-gray-200"
  const hoverBg = "hover:bg-gray-200"
  const selectedBg = "bg-gray-300"

  return (
    <div className={`flex h-full ${bgColor} ${textColor} relative`}>
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileSidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 md:relative md:w-64 ${sidebarBg} border-r ${borderColor} flex-col transform transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } flex`}>
        <div className="p-3 border-b border-gray-300 flex justify-between items-center">
          <h2 className="font-medium ">Notes</h2>
          {/* Close button for mobile */}
          <button 
            className="md:hidden p-1 hover:bg-gray-300 rounded transition-colors duration-200"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 scrollbar-hide">
          {notes.map((note, index) => (
            <div
              key={note.id}
              className={`p-3 cursor-pointer transition-colors duration-200 ${
                selectedNoteId === note.id ? selectedBg : hoverBg
              }`}
              onClick={() => handleNoteSelect(note.id)}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-sm mt-1 truncate text-gray-600">
                {note.content.split("\n")[0].replace(/^#+ /, "")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            <div className={`p-2.5 border-b ${borderColor} flex justify-between items-center`}>
              <div className="flex items-center gap-2">
                {/* Mobile menu button */}
                <button 
                  className="md:hidden p-1 hover:bg-gray-200 rounded"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h2 className="font-medium text-lg">{selectedNote.title}</h2>
              </div>
              <div className="text-xs text-gray-500">
                {formatDateTime(currentDateTime)}
              </div>
            </div>
            <div className="flex-1 p-4 md:p-6 overflow-auto scrollbar-hide">
              <div className="prose prose-sm md:prose-base max-w-none">
                <ReactMarkdown
                  components={{
                    img: ({ node, ...props }) => {
                      const alt = props.alt || '';
                      const src = props.src || '';
                      const isSkillBadge = src.includes('shields.io') || alt.includes('shields.io');
                      
                      if (isSkillBadge) {
                        return (
                          <img className="rounded-lg shadow-md inline-block m-1 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                            {...props}/>
                        );
                      }
                      return <img {...props} className="rounded-lg shadow-md" />;
                    },
                    h1: ({ node, ...props }) => (
                      <h1 {...props} className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text " />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 {...props} className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-800" />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 {...props} className="text-xl md:text-2xl font-medium mb-3 text-gray-700" />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul {...props} className="space-y-3 my-4" />
                    ),
                    li: ({ node, ...props }) => (
                      <li {...props} className="flex items-start gap-2" />
                    ),
                    p: ({ node, children, ...props }) => {
                      const hasImage = node?.children?.some((child: any) => child.tagName === 'img');
                      if (hasImage) {
                        return (
                          <p {...props} className="flex flex-wrap gap-2 items-center my-4">
                            {children}
                          </p>
                        );
                      }
                      return <p {...props} className="my-3 leading-relaxed" />;
                    },
                    hr: ({ node, ...props }) => (
                      <hr {...props} className="my-6 border-gray-300" />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong {...props} className="font-bold" />
                    ),
                    a: ({ node, ...props }) => (
                      <a {...props} className="text-blue-600 hover:text-blue-700 underline transition-colors duration-200" target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {selectedNote.content}
                </ReactMarkdown>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
