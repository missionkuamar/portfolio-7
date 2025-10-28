import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-secondary to-gray-900 flex items-center pt-16">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm <span className="text-primary">Mission Kumar</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
            MERN Stack Developer
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            I create amazing web applications using MongoDB, Express.js, React, and Node.js. 
            Passionate about building scalable solutions and great user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#projects"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-lg"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com" className="text-gray-400 hover:text-primary text-2xl transition-colors duration-300">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-primary text-2xl transition-colors duration-300">
              <FaLinkedin />
            </a>
            <a href="mailto:mission@example.com" className="text-gray-400 hover:text-primary text-2xl transition-colors duration-300">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;