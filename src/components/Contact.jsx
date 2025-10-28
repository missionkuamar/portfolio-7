import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Get In Touch</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Let's work together!</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, I'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <FaEnvelope className="text-primary mr-4" />
                <span>mission@example.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FaPhone className="text-primary mr-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="text-primary mr-4" />
                <span>India</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;