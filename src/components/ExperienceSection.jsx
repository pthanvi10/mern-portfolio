import React from "react";

const experiences = [
  {
    title: "MERN Stack Developer",
    company: "Self Learning & Personal Projects",
    duration: "2025 - Present",
    location: "Remote",
    description: [
      "Built full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
      "Developed responsive user interfaces with React and modern CSS frameworks.",
      "Created REST APIs and integrated databases for dynamic applications.",
      "Worked on authentication, CRUD operations, and deployment workflows.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Hypersoft Solutions",
    duration: "DEC 2025 - FEB 2026",
    location: "Secundarabad, Telanagana",
    description: [
      "Built and maintained applications using C#, .NET, and SQL Server.",
      "Worked with databases and optimized SQL queries.",
      "Debugged and fixed software issues with the development team.",
      "Gained experience in SDLC, testing, and database management.",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Experience</span>
        </h2>

        <div className="relative border-l-2 border-gray-700 ml-4">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-10 ml-8 relative">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-10 top-2"></div>

              <h3 className="text-xl font-semibold">{exp.title}</h3>

              <p>
                {exp.company} • {exp.duration} • {exp.location}
              </p>

              <ul className="mt-3 space-y-2 ">
                {exp.description.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
