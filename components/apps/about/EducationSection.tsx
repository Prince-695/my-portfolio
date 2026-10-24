import { educationData } from "@/data"

export default function EducationSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        🎓 Education
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-900">
        {educationData.degree}
      </h2>
      
      <p className="text-lg font-bold mb-2 text-gray-800">
        {educationData.institution} — {educationData.faculty}
      </p>
      
      <p className="text-base mb-2 text-gray-700">
        <strong>Location:</strong> {educationData.location}
      </p>
      
      <p className="text-base mb-2 text-gray-700">
        <strong>Duration:</strong> {educationData.duration}
      </p>
      
      <p className="text-base mb-6 text-gray-700">
        <strong>CGPA:</strong> {educationData.cgpa}
      </p>
      
      <hr className="my-6 border-gray-300" />
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-900">
        Core Focus Areas
      </h2>
      
      <ul className="space-y-3 mb-6">
        {educationData.focusAreas.map((area, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-gray-800 text-sm md:text-base">
            <span className="text-blue-600 font-bold">•</span>
            <span>{area}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
