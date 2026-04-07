// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";
import { portfolioData } from "../data/portfolio";

function LaptopContent({ data }) {
  return (
    <div>
      <p className="text-base mb-4" style={{ color: "#3D2B1F" }}>
        {data.content.bio}
      </p>
      <h4 className="text-sm font-semibold mb-3" style={{ color: "#1A7A7A" }}>
        Tech Stack
      </h4>
      <div className="flex flex-wrap gap-2">
        {data.content.techStack.map((tech) => (
          <span
            key={tech.name}
            className="px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: "rgba(26, 122, 122, 0.1)",
              color: "#1A7A7A",
              border: "1px solid rgba(26, 122, 122, 0.3)",
            }}
          >
            {tech.icon} {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function BookshelfContent({ data }) {
  return (
    <div className="space-y-3">
      {data.content.projects.map((project) => (
        <div
          key={project.name}
          className="p-3 rounded-xl"
          style={{
            background: "rgba(26, 122, 122, 0.06)",
            border: "1px solid rgba(196, 132, 45, 0.2)",
          }}
        >
          <h4 className="text-sm font-bold mb-1" style={{ color: "#3D2B1F" }}>
            {project.name}
          </h4>
          <p className="text-xs mb-2" style={{ color: "#5A3D2B" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: "rgba(212, 72, 142, 0.15)",
                  color: "#D4488E",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CoffeeTableContent({ data }) {
  return (
    <div className="space-y-3">
      {data.content.experiences.map((exp) => (
        <div
          key={exp.role}
          className="p-3 rounded-xl"
          style={{
            background: "rgba(196, 132, 45, 0.06)",
            border: "1px solid rgba(196, 132, 45, 0.2)",
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{exp.icon}</span>
            <div>
              <h4 className="text-sm font-bold" style={{ color: "#3D2B1F" }}>
                {exp.role}
              </h4>
              <p className="text-xs font-semibold" style={{ color: "#1A7A7A" }}>
                {exp.company}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#C4842D" }}>
                {exp.period}
              </p>
              <p className="text-xs mt-1" style={{ color: "#5A3D2B" }}>
                {exp.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WardrobeContent({ data }) {
  return (
    <div className="space-y-4">
      {data.content.categories.map((cat) => (
        <div key={cat.name}>
          <h4 className="text-sm font-bold mb-2" style={{ color: "#3D2B1F" }}>
            {cat.name}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: `${cat.color}20`,
                  color: cat.color,
                  border: `1px solid ${cat.color}50`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PlantContent({ data }) {
  return (
    <div>
      {/* Education */}
      <h4 className="text-sm font-bold mb-3" style={{ color: "#1A7A7A" }}>Education</h4>
      <div className="space-y-2 mb-4">
        {data.content.education.map((edu) => (
          <div
            key={edu.degree}
            className="p-3 rounded-xl"
            style={{
              background: "rgba(26, 122, 122, 0.06)",
              border: "1px solid rgba(26, 122, 122, 0.15)",
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">{edu.icon}</span>
              <div>
                <h5 className="text-sm font-bold" style={{ color: "#3D2B1F" }}>{edu.degree}</h5>
                <p className="text-xs" style={{ color: "#1A7A7A" }}>{edu.institution}</p>
                <p className="text-xs mt-0.5" style={{ color: "#C4842D" }}>{edu.score} | {edu.period}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h4 className="text-sm font-bold mb-2" style={{ color: "#D4488E" }}>Achievements</h4>
      <div className="space-y-1.5 mb-4">
        {data.content.achievements.map((a) => (
          <div key={a.name} className="flex items-center gap-2 text-xs" style={{ color: "#3D2B1F" }}>
            <span>{a.icon}</span>
            <span>{a.name}</span>
          </div>
        ))}
      </div>

      {/* Courses */}
      <h4 className="text-sm font-bold mb-2" style={{ color: "#C4842D" }}>Courses & Certifications</h4>
      <div className="space-y-1">
        {data.content.courses.map((c) => (
          <p key={c} className="text-xs pl-3" style={{ color: "#5A3D2B", borderLeft: "2px solid #C4842D" }}>
            {c}
          </p>
        ))}
      </div>
    </div>
  );
}

function WindowContent({ data }) {
  return (
    <div>
      <div className="space-y-3 mb-4">
        {data.content.links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl no-underline transition-all"
            style={{
              background: "rgba(26, 122, 122, 0.06)",
              border: "1px solid rgba(196, 132, 45, 0.2)",
              color: "#3D2B1F",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(26, 122, 122, 0.12)";
              e.currentTarget.style.borderColor = "rgba(196, 132, 45, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(26, 122, 122, 0.06)";
              e.currentTarget.style.borderColor = "rgba(196, 132, 45, 0.2)";
            }}
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="text-sm font-semibold">{link.name}</span>
            <span className="ml-auto text-xs" style={{ color: "#C4842D" }}>
              →
            </span>
          </a>
        ))}
      </div>
      {data.content.location && (
        <p className="text-xs text-center mt-4" style={{ color: "#5A3D2B" }}>
          {data.content.location}
        </p>
      )}
    </div>
  );
}

const contentRenderers = {
  laptop: LaptopContent,
  bookshelf: BookshelfContent,
  coffeeTable: CoffeeTableContent,
  wardrobe: WardrobeContent,
  plant: PlantContent,
  window: WindowContent,
};

export default function ContentPanel() {
  const { activePanel, closePanel } = useGame();
  const data = activePanel ? portfolioData[activePanel] : null;
  const ContentRenderer = activePanel ? contentRenderers[activePanel] : null;

  return (
    <AnimatePresence>
      {activePanel && data && ContentRenderer && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(26, 42, 68, 0.4)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md overflow-y-auto"
            style={{
              background: "linear-gradient(180deg, #FFF8F0 0%, #FFF4E6 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: "-8px 0 40px rgba(26, 122, 122, 0.15)",
              borderLeft: "2px solid rgba(196, 132, 45, 0.3)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="p-6">
              {/* Close button */}
              <button
                onClick={closePanel}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-none text-lg"
                style={{
                  background: "rgba(26, 122, 122, 0.15)",
                  color: "#1A7A7A",
                }}
              >
                ×
              </button>

              {/* Decorative top line */}
              <div className="mb-4" style={{
                height: "3px",
                background: "linear-gradient(90deg, #C4842D, #D4488E, #1A7A7A)",
                borderRadius: "2px",
                width: "60%",
              }} />

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2
                  className="text-2xl font-bold mb-1"
                  style={{ color: "#1A7A7A", fontFamily: "'Quicksand', sans-serif" }}
                >
                  {data.title}
                </h2>
                <p className="text-sm mb-6" style={{ color: "#C4842D" }}>
                  {data.subtitle}
                </p>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ContentRenderer data={data} />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
