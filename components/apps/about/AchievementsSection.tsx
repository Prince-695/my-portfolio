import { certificationsData, hackathonsData, projectsData, technicalImpactData } from "@/data"

export default function AchievementsSection() {
  const featuredProjects = projectsData.filter((p) => p.featured)

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        🏆 Certifications & Achievements
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-900">
        Professional Certifications
      </h2>
      
      <ul className="space-y-3 mb-6">
        {certificationsData.map((cert) => (
          <li key={cert.id} className="flex items-start gap-2.5 text-gray-800 text-sm md:text-base">
            <span>{cert.badgeIcon}</span>
            <div>
              <strong>{cert.title}</strong> — {cert.issuer} ({cert.date})
              {cert.description && <p className="text-xs text-gray-600 mt-0.5">{cert.description}</p>}
            </div>
          </li>
        ))}
      </ul>
      
      <hr className="my-6 border-gray-300" />
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-900">
        Hackathons & Competitions
      </h2>
      
      <ul className="space-y-3 mb-6">
        {hackathonsData.map((hack) => (
          <li key={hack.id} className="flex items-start gap-2.5 text-gray-800 text-sm md:text-base">
            <span>{hack.badgeIcon}</span>
            <div>
              <strong>{hack.title}</strong> — {hack.issuer} ({hack.date})
              {hack.description && <p className="text-xs text-gray-600 mt-0.5">{hack.description}</p>}
            </div>
          </li>
        ))}
      </ul>
      
      <hr className="my-6 border-gray-300" />
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-900">
        Notable Projects
      </h2>
      
      <ul className="space-y-3 mb-6">
        {featuredProjects.map((project) => (
          <li key={project.id} className="flex items-start gap-2.5 text-gray-800 text-sm md:text-base">
            <span className="text-blue-600 font-bold">•</span>
            <div>
              <strong>{project.title}</strong> — {project.description}
            </div>
          </li>
        ))}
      </ul>
      
      <hr className="my-6 border-gray-300" />
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-900">
        Technical Impact
      </h2>
      
      <ul className="space-y-3 mb-6">
        {technicalImpactData.map((impact, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-gray-800 text-sm md:text-base">
            <span className="text-blue-600 font-bold">•</span>
            <span>{impact}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
