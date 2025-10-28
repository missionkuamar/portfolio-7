import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with user authentication, payment integration, and admin dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "#",
      githubLink: "#",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team features",
      technologies: ["React", "Socket.io", "Express", "MongoDB"],
      liveLink: "#",
      githubLink: "#",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with data visualization",
      technologies: ["React", "Chart.js", "Node.js", "REST API"],
      liveLink: "#",
      githubLink: "#",
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-4">My Projects</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-secondary rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a 
                    href={project.liveLink}
                    className="flex items-center text-white hover:text-primary transition-colors duration-300"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Live Demo
                  </a>
                  <a 
                    href={project.githubLink}
                    className="flex items-center text-white hover:text-primary transition-colors duration-300"
                  >
                    <FaGithub className="mr-2" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;