import { skillsData } from "@/data"

export default function SkillsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        💻 Tech Stack & Skills
      </h1>

      {skillsData.map((cat, index) => (
        <div key={cat.category}>
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-800">
            {cat.category}
          </h2>

          <div className="flex flex-wrap gap-2 items-center my-4">
            {cat.skills.map((skill) => (
              skill.badgeUrl ? (
                <img
                  key={skill.name}
                  src={skill.badgeUrl}
                  alt={skill.name}
                  className="rounded-lg shadow-xs inline-block transform transition-transform duration-200 hover:scale-105"
                />
              ) : (
                <span
                  key={skill.name}
                  className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800"
                >
                  {skill.name}
                </span>
              )
            ))}
          </div>

          {index < skillsData.length - 1 && (
            <hr className="my-6 border-gray-300" />
          )}
        </div>
      ))}
    </div>
  )
}
