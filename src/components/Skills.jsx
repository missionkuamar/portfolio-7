const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind CSS", level: 88 }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "RESTful APIs", level: 85 },
        { name: "Authentication", level: 80 }
      ]
    },
    {
      category: "Database & Tools",
      skills: [
        { name: "MongoDB", level: 75 },
        { name: "Mongoose", level: 70 },
        { name: "Git", level: 85 },
        { name: "VS Code", level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Skills & Technologies</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between text-white mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;