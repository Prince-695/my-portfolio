// Unified Data Handler for Prince Rathod Portfolio
// All site content is managed and exported from here.

export * from "./profile"
export * from "./projects"
export * from "./experience"
export * from "./skills"
export * from "./education"

import { profileData } from "./profile"
import { projectsData } from "./projects"
import { experienceData } from "./experience"
import { skillsData } from "./skills"
import { educationData, certificationsData, hackathonsData, technicalImpactData } from "./education"

export const portfolioData = {
  profile: profileData,
  projects: projectsData,
  experience: experienceData,
  skills: skillsData,
  education: educationData,
  certifications: certificationsData,
  hackathons: hackathonsData,
  technicalImpact: technicalImpactData,
}

export default portfolioData
