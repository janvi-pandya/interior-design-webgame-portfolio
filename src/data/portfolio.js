export const portfolioData = {
  laptop: {
    title: "About Me",
    subtitle: "Full Stack Engineer",
    content: {
      bio: "Hi, I'm Janvi! A full-stack engineer who loves building elegant solutions and designing cozy spaces.",
      techStack: [
        { name: "React", icon: "⚛️" },
        { name: "Node.js", icon: "🟢" },
        { name: "MongoDB", icon: "🍃" },
        { name: ".NET", icon: "🔷" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Git", icon: "📦" },
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
          description: "Business Information Management System for enterprise operations",
          tags: ["Enterprise", ".NET", "SQL Server"],
        },
        {
          name: "Smart Gear Monitoring",
          description: "IoT-based gear monitoring system with real-time analytics",
          tags: ["IoT", "React", "Node.js"],
        },
        {
          name: "IT Infra Access Gateway",
          description: "Secure access gateway for IT infrastructure management",
          tags: ["Security", "API", "PostgreSQL"],
        },
        {
          name: "Asset Movement System",
          description: "Track and manage asset movements across facilities",
          tags: ["Logistics", "React", "MongoDB"],
        },
      ],
    },
  },
  coffeeTable: {
    title: "Design Inspirations",
    subtitle: "Interior Design Portfolio",
    content: {
      inspirations: [
        { name: "Moodboards", description: "Curating aesthetic palettes and textures for dreamy spaces", icon: "🎨" },
        { name: "Layouts", description: "Functional floor plans that balance beauty and comfort", icon: "📐" },
        { name: "Design Philosophy", description: "Cozy minimalism — less clutter, more warmth", icon: "✨" },
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
          skills: ["React", "JavaScript", "CSS", "UI/UX", "Tailwind CSS"],
          color: "#F6C9D6",
        },
        {
          name: "Backend",
          skills: ["Node.js", ".NET", "API Design", "Express"],
          color: "#CFC8FF",
        },
        {
          name: "Database",
          skills: ["PostgreSQL", "MongoDB", "SQL", "Redis"],
          color: "#CDE7FF",
        },
      ],
    },
  },
  plant: {
    title: "Personality",
    subtitle: "Beyond Code",
    content: {
      traits: [
        { name: "Music Lover", icon: "🎵", description: "Lo-fi beats and Bollywood classics" },
        { name: "Cooking Enthusiast", icon: "🍳", description: "Experimenting with flavors and recipes" },
        { name: "Cozy Aesthetics", icon: "🕯️", description: "Creating warm, inviting spaces" },
        { name: "Problem Solver", icon: "🧩", description: "Turning complex challenges into elegant solutions" },
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
];
