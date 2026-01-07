export default function AboutSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        👋 Hello, I'm Prince Rathod
      </h1>
      
      <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
        Co-founder & Lead Full Stack Developer | AI-ML Enthusiast
      </h3>
      
      <hr className="my-6 border-gray-300" />
      
      <p className="text-base leading-relaxed mb-6">
        I'm a BTech Computer Science (AI-ML) student at Adani University with a passion for building scalable, 
        innovative web solutions. As the Co-founder & Lead Full Stack Developer at <strong>SPIFFY</strong>, I lead 
        teams in delivering high-quality digital products while exploring cutting-edge AI integrations.
      </p>
      
      {/* <ul className="space-y-3 my-6">
        <li className="flex items-start gap-2">
          <span>🚀</span>
          <span>Co-founder at <strong>SPIFFY</strong> - Building custom web solutions for clients</span>
        </li>
        <li className="flex items-start gap-2">
          <span>💻</span>
          <span>Frontend Tech Intern at <strong>TECHYEZ</strong> - Creating real-time learning visualizers</span>
        </li>
        <li className="flex items-start gap-2">
          <span>🎓</span>
          <span>Studying <strong>Computer Science & Technology (AI-ML)</strong> at Adani University</span>
        </li>
        <li className="flex items-start gap-2">
          <span>🌱</span>
          <span>Expert in <strong>MERN Stack, Next.js, TypeScript, AI Integration</strong></span>
        </li>
        <li className="flex items-start gap-2">
          <span>🏆</span>
          <span>2nd Runner-up at TIC TECH TOE'24 | Top 40 at DotSlash 8.0</span>
        </li>
        <li className="flex items-start gap-2">
          <span>📫 My</span>
            <a 
              href="https://princerathod.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
            >
              Portfolio
            </a>
        </li>
      </ul> */}
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-800">
        What I Do
      </h2>
      
      <p className="text-base leading-relaxed mb-6">
        I specialize in full-stack development with a focus on modern web technologies and AI integration. 
        From designing pixel-perfect UIs with advanced animations to architecting scalable backends with 
        efficient database management, I deliver end-to-end solutions that drive business value.
      </p>
      
      <p className="text-base font-bold mb-3">My Approach:</p>
      
      <ul className="space-y-3 mb-6">
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Building scalable architectures with Next.js, TypeScript, and modern frameworks</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Integrating AI capabilities (OpenAI, Gemini API) for intelligent user experiences</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Leading teams and fostering collaborative, growth-driven development environments</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Performance optimization, clean code, and maintaining strong client relationships</span>
        </li>
      </ul>
    </div>
  )
}
