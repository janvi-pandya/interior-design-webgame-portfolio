// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";
import { portfolioData } from "../data/portfolio";

function LaptopContent({ data }) {
  return (
    <div>
      <p className="text-base mb-4" style={{ color: "#7a6b8a" }}>
        {data.content.bio}
      </p>
      <h4 className="text-sm font-semibold mb-3" style={{ color: "#4a3f5c" }}>
        Tech Stack
      </h4>
      <div className="flex flex-wrap gap-2">
        {data.content.techStack.map((tech) => (
          <span
            key={tech.name}
            className="px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: "rgba(207, 200, 255, 0.2)",
              color: "#4a3f5c",
              border: "1px solid rgba(207, 200, 255, 0.4)",
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
            background: "rgba(207, 200, 255, 0.1)",
            border: "1px solid rgba(207, 200, 255, 0.2)",
          }}
        >
          <h4 className="text-sm font-bold mb-1" style={{ color: "#4a3f5c" }}>
            {project.name}
          </h4>
          <p className="text-xs mb-2" style={{ color: "#7a6b8a" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: "rgba(246, 201, 214, 0.3)",
                  color: "#7a6b8a",
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
      {data.content.inspirations.map((item) => (
        <div
          key={item.name}
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{
            background: "rgba(205, 231, 255, 0.15)",
            border: "1px solid rgba(205, 231, 255, 0.3)",
          }}
        >
          <span className="text-2xl">{item.icon}</span>
          <div>
            <h4 className="text-sm font-bold" style={{ color: "#4a3f5c" }}>
              {item.name}
            </h4>
            <p className="text-xs" style={{ color: "#7a6b8a" }}>
              {item.description}
            </p>
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
          <h4 className="text-sm font-bold mb-2" style={{ color: "#4a3f5c" }}>
            {cat.name}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: `${cat.color}40`,
                  color: "#4a3f5c",
                  border: `1px solid ${cat.color}80`,
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
    <div className="grid grid-cols-2 gap-2">
      {data.content.traits.map((trait) => (
        <div
          key={trait.name}
          className="p-3 rounded-xl text-center"
          style={{
            background: "rgba(216, 243, 227, 0.2)",
            border: "1px solid rgba(216, 243, 227, 0.4)",
          }}
        >
          <div className="text-2xl mb-1">{trait.icon}</div>
          <h4 className="text-xs font-bold mb-0.5" style={{ color: "#4a3f5c" }}>
            {trait.name}
          </h4>
          <p className="text-xs" style={{ color: "#7a6b8a" }}>
            {trait.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function WindowContent({ data }) {
  return (
    <div className="space-y-3">
      {data.content.links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl no-underline transition-all"
          style={{
            background: "rgba(207, 200, 255, 0.1)",
            border: "1px solid rgba(207, 200, 255, 0.3)",
            color: "#4a3f5c",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(207, 200, 255, 0.25)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(207, 200, 255, 0.1)";
          }}
        >
          <span className="text-2xl">{link.icon}</span>
          <span className="text-sm font-semibold">{link.name}</span>
          <span className="ml-auto text-xs" style={{ color: "#7a6b8a" }}>
            →
          </span>
        </a>
      ))}
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
            style={{ background: "rgba(74, 63, 92, 0.3)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md overflow-y-auto"
            style={{
              background: "rgba(255, 244, 230, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "-8px 0 40px rgba(207, 200, 255, 0.3)",
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
                  background: "rgba(207, 200, 255, 0.3)",
                  color: "#4a3f5c",
                }}
              >
                ×
              </button>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2
                  className="text-2xl font-bold mb-1"
                  style={{ color: "#4a3f5c", fontFamily: "'Quicksand', sans-serif" }}
                >
                  {data.title}
                </h2>
                <p className="text-sm mb-6" style={{ color: "#7a6b8a" }}>
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
