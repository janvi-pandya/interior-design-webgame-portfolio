export const portfolioData = {
  laptop: {
    title: "About Me",
    subtitle: "Full Stack Developer",
    content: {
      bio: "A perpetual learner, eager to take on diverse roles that contribute to various innovations, utilising my coding prowess. Full-stack developer based in Vallabh Vidyanagar, India.",
      techStack: [
        { name: "React.js", icon: "⚛️" },
        { name: "Node.js", icon: "🟢" },
        { name: ".NET", icon: "🔷" },
        { name: "Python", icon: "🐍" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "SQL", icon: "📊" },
        { name: "Git", icon: "📦" },
        { name: "Java", icon: "☕" },
        { name: "PHP", icon: "🟣" },
      ],
    },
  },
  bookshelf: {
    title: "Projects",
    subtitle: "Things I've Built",
    content: {
      projects: [
        {
          name: "Semi-automatic Solar Cleaner",
          description: "Budget-friendly firmware to efficiently remove dust from solar panels without the use of water.",
          tags: ["Firmware", "IoT", "Hardware"],
        },
        {
          name: "Placement Management System",
          description: "Web app for student job applications, college admin reviews, and company hiring — built with PHP & MySQL.",
          tags: ["PHP", "MySQL", "Full Stack"],
        },
        {
          name: "Tic-Tac-Toe",
          description: "Java application with graphical UI for the classic game of Tic-Tac-Toe.",
          tags: ["Java", "GUI", "Game"],
        },
      ],
    },
  },
  coffeeTable: {
    title: "Experience",
    subtitle: "My Professional Journey",
    content: {
      experiences: [
        {
          role: "Trainee Engineer (Software)",
          company: "Tech Elecon Pvt. Ltd. (ELECON Group)",
          period: "October 2023 — Present",
          description: "Working as a full-stack developer on enterprise software solutions.",
          icon: "💼",
        },
        {
          role: "Full Stack Developer Intern",
          company: "Tech It Easy, Ahmedabad",
          period: "December 2022 — May 2023",
          description: "Automated e-way bills in transportation systems using React.js, Swagger UI, Python, MySQL, and Git.",
          icon: "🚀",
        },
        {
          role: ".NET Intern",
          company: "Hatkesh Infotech Pvt. Ltd., Anand",
          period: "June 2022",
          description: "Database principles and strategies for application development and modification.",
          icon: "🔧",
        },
        {
          role: "Laravel Intern",
          company: "Infikey Technologies, Ahmedabad",
          period: "June 2021 — July 2021",
          description: "Learned PHP framework and built a compact chatbot application.",
          icon: "💬",
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
          name: "Languages",
          skills: ["Python", "PHP", "SQL", ".NET", "React.js", "Java", "JavaScript", "CSS"],
          color: "#D4488E",
        },
        {
          name: "Tools",
          skills: ["Git", "VS Code", "Android Studio", "Unity Hub", "MS-Server", "Swagger UI"],
          color: "#1A7A7A",
        },
        {
          name: "Core",
          skills: ["Problem Solving", "Quick Learner", "DSA", "API Design", "UI/UX"],
          color: "#C4842D",
        },
      ],
    },
  },
  plant: {
    title: "Education & Achievements",
    subtitle: "My Learning Journey",
    content: {
      education: [
        {
          degree: "B.Tech in Computer Engineering",
          institution: "Birla Vishwakarma Mahavidyalaya (BVM)",
          score: "8.59 CGPA",
          period: "2020 — 2023",
          icon: "🎓",
        },
        {
          degree: "Diploma",
          institution: "Bhailal & Bhikhabhai Institute of Technology (BBIT)",
          score: "9.77 CGPA",
          period: "2017 — 2020",
          icon: "📜",
        },
      ],
      achievements: [
        { name: "First Prize — College Level Project Expo 2023, BVM", icon: "🏆" },
        { name: "Semi-finalist — Code Gladiators 2023, Techgig", icon: "⚔️" },
      ],
      courses: [
        "Algorithms by Stanford University (Coursera)",
        "Information Security in Python (Udemy)",
        "Professional English Communication (Coursera)",
      ],
    },
  },
  window: {
    title: "Contact",
    subtitle: "Let's Connect",
    content: {
      links: [
        { name: "GitHub", url: "https://github.com/janvi-pandya", icon: "🐙" },
        { name: "LinkedIn", url: "https://linkedin.com/in/janvi-pandya", icon: "💼" },
        { name: "Email", url: "mailto:janvipandya1103@gmail.com", icon: "✉️" },
        { name: "Phone", url: "tel:+918849473722", icon: "📱" },
      ],
      location: "Vallabh Vidyanagar, Anand, Gujarat, India",
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
];

export const objectLabels = {
  laptop: { emoji: "💻", name: "Laptop", section: "About Me" },
  bookshelf: { emoji: "📚", name: "Bookshelf", section: "Projects" },
  coffeeTable: { emoji: "☕", name: "Coffee Table", section: "Experience" },
  wardrobe: { emoji: "👗", name: "Wardrobe", section: "Skills" },
  plant: { emoji: "🌿", name: "Plant", section: "Education" },
  window: { emoji: "🪟", name: "Window", section: "Contact" },
};
