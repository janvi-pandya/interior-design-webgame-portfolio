export const portfolioData = {
  laptop: {
    title: "About Me",
    subtitle: "Full Stack Developer • MERN + .NET",
    content: {
      bio: "Hi, I’m Janvi Pandya — a creative, detail-oriented full stack developer with 2+ years of professional experience building scalable web applications.",
      techStack: [
        { name: "React.js", icon: "⚛️" },
        { name: "Node.js", icon: "🟢" },
        { name: "Express.js", icon: "🚏" },
        { name: "MongoDB", icon: "🍃" },
        { name: ".NET (MVC)", icon: "🔷" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MS SQL Server", icon: "🧊" },
        { name: "Python", icon: "🐍" },
        { name: "PHP", icon: "🐘" },
        { name: "Git", icon: "🔀" },
      ],
    },
  },
  bookshelf: {
    title: "Projects",
    subtitle: "Things I've Built",
    content: {
      projects: [
        {
          name: "BIMS (Elecon)",
          description:
            "Internal inventory management system for real-time stock tracking, procurement, and asset location. React + .NET + MS SQL.",
          tags: ["React", ".NET", "MS SQL", "Enterprise"],
        },
        {
          name: "Smart Gear Monitoring",
          description:
            "Monitoring dashboard for predictive maintenance of industrial gear systems with real-time visualization. React + PostgreSQL.",
          tags: ["React", "PostgreSQL", "Dashboards"],
        },
        {
          name: "IT Infra Access Gateway",
          description:
            "Secure role-based access control system for internal infrastructure. Built with .NET MVC + PostgreSQL.",
          tags: [".NET MVC", "PostgreSQL", "Security"],
        },
        {
          name: "Asset Movement Management System",
          description:
            "Hardware/equipment movement tracking with approvals and audit trails. React UI + MS SQL repository.",
          tags: ["React", "MS SQL", "Workflow"],
        },
        {
          name: "Semi‑automatic Solar Cleaner",
          description: "Budget-friendly firmware to remove dust from solar panels efficiently without using water.",
          tags: ["Firmware", "Embedded", "Innovation"],
        },
        {
          name: "Placement Management System",
          description:
            "Web app for student applications, admin approval, and company hiring workflow using PHP + MySQL.",
          tags: ["PHP", "MySQL", "Web App"],
        },
        {
          name: "Tic‑Tac‑Toe (Java GUI)",
          description: "A desktop Java application with a graphical UI for the classic game.",
          tags: ["Java", "GUI", "Fun"],
        },
      ],
    },
  },
  coffeeTable: {
    title: "Experience",
    subtitle: "Work + Internships",
    content: {
      inspirations: [
        {
          name: "Senior Engineer (Software) — Tech Elecon Pvt. Ltd. (ELECON Group)",
          description: "Nov 2024 – Present • .NET, React.js, PostgreSQL, MS SQL, Git",
          icon: "💼",
        },
        {
          name: "Trainee Engineer (Software) — Tech Elecon Pvt. Ltd. (ELECON Group)",
          description: "Oct 2023 – Oct 2024 • Full stack exposure + ongoing product development",
          icon: "🧩",
        },
        {
          name: "Full Stack Developer Intern — Tech It Easy (Ahmedabad)",
          description:
            "Dec 2022 – May 2023 • React.js, SwaggerUI, Python, MySQL, Git • Automated e‑way bill management for transportation systems",
          icon: "🧑‍💻",
        },
        {
          name: ".NET Intern — Hatkesh Infotech Pvt. Ltd. (Anand)",
          description: "Jun 2022 • .NET, Visual Studio • Database fundamentals + live project modifications",
          icon: "🔷",
        },
        {
          name: "Laravel Intern — Infikey Technologies (Ahmedabad)",
          description: "Jun 2021 – Jul 2021 • Laravel • Built a compact chatbot application with a team",
          icon: "🟣",
        },
      ],
    },
  },
  wardrobe: {
    title: "Skills",
    subtitle: "What I Work With",
    content: {
      categories: [
        {
          name: "Frontend",
          skills: ["React.js", "HTML", "CSS", "JavaScript", "Bootstrap"],
          color: "#F6C9D6",
        },
        {
          name: "Backend",
          skills: ["Node.js", "Express.js", ".NET (MVC)"],
          color: "#CFC8FF",
        },
        {
          name: "Database",
          skills: ["MongoDB", "PostgreSQL", "MS SQL Server", "MySQL"],
          color: "#CDE7FF",
        },
        {
          name: "Tools",
          skills: ["Git", "VS Code", "Android Studio", "Unity Hub", "MS‑Server", "PowerPoint"],
          color: "#FFD6C9",
        },
        {
          name: "Languages",
          skills: ["JavaScript", "C#", "Python", "PHP", "Java"],
          color: "#D8F3E3",
        },
      ],
    },
  },
  plant: {
    title: "Highlights",
    subtitle: "Achievements + Courses",
    content: {
      traits: [
        { name: "Project Expo Winner", icon: "🏆", description: "First Prize — College Level Project Expo 2023 (BVM)" },
        { name: "Code Gladiators", icon: "⚔️", description: "Semi‑finalist — Code Gladiators 2023 (Techgig)" },
        { name: "Stanford (Coursera)", icon: "🎓", description: "Divide & Conquer, Sorting/Searching, Randomized Algorithms" },
        { name: "Security (Udemy)", icon: "🛡️", description: "Information Security in Python" },
      ],
    },
  },
  window: {
    title: "Contact",
    subtitle: "Let's Connect",
    content: {
      links: [
        { name: "Email", url: "mailto:janvipandya1103@gmail.com", icon: "✉️" },
        { name: "Phone", url: "tel:+918849473722", icon: "📞" },
        { name: "Location", url: "https://www.google.com/maps/search/?api=1&query=Vallabh%20Vidyanagar%2C%20Anand%2C%20India", icon: "📍" },
      ],
    },
  },
  diwanBed: {
    title: "Education",
    subtitle: "Academic journey",
    content: {
      items: [
        {
          name: "B.Tech — Computer Engineering (BVM)",
          description: "Aug 2020 – Jun 2023 • CGPA 8.59",
        },
        {
          name: "Diploma — Computer Engineering (BBIT)",
          description: "Jul 2017 – Jun 2020 • CGPA 9.77",
        },
        {
          name: "Secondary School (KKV)",
          description: "85%",
        },
      ],
    },
  },
};

export const objectOrder = [
  "laptop",
  "bookshelf",
  "coffeeTable",
  "wardrobe",
  "plant",
  "window",
  "diwanBed",
];
