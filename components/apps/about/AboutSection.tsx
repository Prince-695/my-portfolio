import { profileData } from "@/data"

export default function AboutSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        👋 Hello, I'm {profileData.name}
      </h1>
      
      <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-6 font-georama">
        {profileData.title}
      </h3>
      
      <hr className="my-6 border-gray-300" />
      
      <p className="text-base leading-relaxed mb-6 text-gray-800">
        {profileData.bio}
      </p>
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-900">
        What I Do
      </h2>
      
      <p className="text-base leading-relaxed mb-6 text-gray-800">
        {profileData.headline} I specialize in full-stack engineering with modern web frameworks, AI integration, and fluid composite-only GPU animations.
      </p>
      
      <p className="text-base font-bold mb-3 text-gray-900">My Approach:</p>
      
      <ul className="space-y-3 mb-6">
        {profileData.approach.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5 text-gray-800">
            <span className="text-blue-600 font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

