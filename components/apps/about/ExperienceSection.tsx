import { experienceData } from "@/data"

export default function ExperienceSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        💼 Professional Experience
      </h1>

      {experienceData.map((exp, index) => (
        <div key={exp.id} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {exp.role}
            </h2>
            {exp.isCurrent && (
              <span className="w-fit px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs font-georama">
                Current Role
              </span>
            )}
          </div>

          <p className="text-base font-semibold text-gray-700">
            {exp.company} | {exp.period} · <span className="text-gray-500 font-normal">{exp.location}</span>
          </p>

          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {exp.description}
          </p>

          {/* Metrics if available */}
          {exp.metrics && exp.metrics.length > 0 && (
            <div className="flex flex-wrap gap-2 my-2">
              {exp.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="px-3 py-1 bg-gray-100 rounded-lg border border-gray-200 text-xs">
                  <span className="text-gray-500 font-medium">{metric.label}: </span>
                  <span className="text-gray-900 font-bold">{metric.value}</span>
                </div>
              ))}
            </div>
          )}

          <ul className="space-y-2.5 my-4">
            {exp.highlights.map((highlight, hIdx) => (
              <li key={hIdx} className="flex items-start gap-2.5 text-sm md:text-base text-gray-800">
                <span className="text-blue-600 font-bold">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-gray-700 mr-1">Tech Stack:</span>
            {exp.techStack.map((tech, tIdx) => (
              <span key={tIdx} className="px-2.5 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-md border border-gray-200">
                {tech}
              </span>
            ))}
          </div>

          {index < experienceData.length - 1 && (
            <hr className="my-8 border-gray-300" />
          )}
        </div>
      ))}
    </div>
  )
}
