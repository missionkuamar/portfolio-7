import { FaCode, FaDatabase, FaServer, FaMobile } from 'react-icons/fa';

const About = () => {
  const services = [
    {
      icon: <FaCode className="text-3xl text-primary" />,
      title: "Frontend Development",
      description: "Creating responsive and interactive UIs with React, Tailwind CSS, and modern JavaScript"
    },
    {
      icon: <FaServer className="text-3xl text-primary" />,
      title: "Backend Development",
      description: "Building robust server-side applications with Node.js, Express.js, and RESTful APIs"
    },
    {
      icon: <FaDatabase className="text-3xl text-primary" />,
      title: "Database Management",
      description: "Designing and optimizing databases with MongoDB, Mongoose, and data modeling"
    },
    {
      icon: <FaMobile className="text-3xl text-primary" />,
      title: "Full Stack Solutions",
      description: "End-to-end web application development with the MERN stack"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-4">About Me</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Passionate MERN Stack Developer
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Hello! I'm Mission Kumar, a dedicated MERN Stack Developer with expertise in building 
              modern web applications. I love turning complex problems into simple, beautiful designs.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              My journey in web development started with a curiosity about how websites work, 
              and it has evolved into a passion for creating efficient, scalable, and user-friendly applications.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I'm not coding, you can find me learning new technologies, contributing to open-source projects, 
              or exploring the latest trends in web development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-secondary p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
                <div className="mb-4">{service.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{service.title}</h4>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;