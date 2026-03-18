export const seedProfile = {
  name: 'Rishabh Kumar Tiwari',
  title: 'Full Stack Developer | C++ | Python | MERN Stack',
  introduction:
    'Computer Science student at Lovely Professional University with strong problem-solving skills and experience in full-stack development. Proficient in C++, Python, JavaScript, and modern frameworks like React and Django. Passionate about building efficient systems, developing scalable web applications, and creating innovative solutions.',
  highlights: ['C++ & Python', 'React + Node.js', 'MongoDB & MySQL', 'Problem Solving'],
  email: 'rishabhtiwari3538@gmail.com',
  phone: '+91 7986307281',
  github: 'https://github.com/rishabhtcodes',
  linkedin: 'https://www.linkedin.com/in/rishabhtcodes/',
  twitter: 'https://x.com/rishabhtcodes',
  profilePhoto: '',
  about: {
    photo: '',
    summary:
      'I am a Computer Science student at Lovely Professional University with hands-on experience in full-stack development, C++ programming, and problem-solving. I focus on building scalable applications and implementing efficient algorithms.',
    interests:
      'I am passionate about web development, software engineering, and creating real-world solutions. I enjoy participating in hackathons, contributing to open-source projects, and learning emerging technologies.',
    description:
      'My journey in tech started with strong fundamentals in C++ and data structures, which I apply to solve complex problems. I have expanded my skills to include full-stack web development using modern frameworks, with a focus on creating user-centric applications and clean, maintainable code.',
    techFocus: ['C++', 'Python', 'React', 'Node.js', 'JavaScript', 'MongoDB', 'MySQL', 'Tailwind CSS'],
  },
  contact: {
    email: 'rishabhtiwari3538@gmail.com',
    phone: '+91 7986307281',
    linkedin: 'https://www.linkedin.com/in/rishabhtcodes/',
    linkedinLabel: 'linkedin.com/in/rishabhtcodes',
    github: 'https://github.com/rishabhtcodes',
    githubLabel: 'github.com/rishabhtcodes',
    copy:
      "Have a project in mind or want to collaborate? I'm available for full-stack web development, C++ programming, and open-source contributions. Reach out through email, LinkedIn, or GitHub. I'm always interested in tackling challenging problems and learning new technologies.",
  },
  resume: {
    title: 'Education & Experience',
    highlights: [
      { label: 'B.Tech CSE', detail: 'LPU (2025-Present) | CGPA: 7.10' },
      { label: 'Languages', detail: 'C++, Python, JavaScript, Java' },
      { label: 'Full Stack', detail: 'MERN Stack Expert' },
      { label: 'Hackathons', detail: 'Top 10 & Rank 4' },
    ],
    resumeLink: '/resume.pdf',
    resumePdfLink: '/resume.pdf',
    resumeDocLink: '/resume.docx',
  },
};

export const seedProjects = [
  {
    title: 'Crop Disease Prediction System',
    description:
      'Built a rule-driven crop analysis tool using C++ with OOP concepts to evaluate temperature-humidity conditions and flag potential disease risks across multiple agricultural datasets. Engineered a structured lookup mechanism using 2D arrays and implemented real-time input validation with accurate health assessments.',
    github: 'https://github.com/rishabhtcodes',
    demo: 'https://github.com/rishabhtcodes',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    techStack: ['C++', 'OOP', 'Data Structures'],
    order: 1,
  },
  {
    title: 'Automated Study Timetable Generator',
    description:
      'Developed a C++ application with a dynamic scheduling engine using STL and algorithmic scheduling. Generates personalized weekly study plans with weighted randomization, handles exam selection, time-slot allocation, and real-time validation for adaptive timetables.',
    github: 'https://github.com/rishabhtcodes',
    demo: 'https://github.com/rishabhtcodes',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1543269634-cbdf466effb1?auto=format&fit=crop&w=1200&q=80',
    techStack: ['C++', 'STL', 'Algorithms'],
    order: 2,
  },
  {
    title: 'Lovely Kart E-Commerce Website',
    description:
      'Created a complete e-commerce platform allowing users to explore products, view details, and manage their cart. Designed a clean, structured layout with responsive design and interactive elements for an engaging and user-friendly online shopping experience.',
    github: 'https://github.com/rishabhtcodes',
    demo: 'https://github.com/rishabhtcodes',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1488190344049-ce7a6949597a?auto=format&fit=crop&w=1200&q=80',
    techStack: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'PHP'],
    order: 3,
  },
];

export const seedSkills = [
  { name: 'C', logo: 'https://cdn.simpleicons.org/c/00599C', description: 'Structured programming and problem solving fundamentals.', category: 'Languages', order: 1 },
  { name: 'C++', logo: 'https://cdn.simpleicons.org/cplusplus/00599C', description: 'OOP, STL, data structures, and algorithmic problem solving.', category: 'Languages', order: 2 },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB', description: 'Backend scripting, automation, and Django-based development.', category: 'Languages', order: 3 },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', description: 'Core Java programming and object-oriented application development.', category: 'Languages', order: 4 },
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', description: 'Interactive web interfaces and client-side logic development.', category: 'Languages', order: 5 },
  { name: 'PHP', logo: 'https://cdn.simpleicons.org/php/A78BFA', description: 'Server-side scripting for dynamic web applications.', category: 'Languages', order: 6 },
  { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26', description: 'Semantic markup and accessible page structure.', category: 'Frontend', order: 7 },
  { name: 'CSS3', logo: 'https://cdn.simpleicons.org/css/1572B6', description: 'Responsive layouts, styling systems, and modern UI polish.', category: 'Frontend', order: 8 },
  { name: 'React.js', logo: 'https://cdn.simpleicons.org/react/61DAFB', description: 'Component-based frontend architecture and state-driven UI.', category: 'Frontend', order: 9 },
  { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933', description: 'Backend runtime for scalable APIs and web services.', category: 'Backend', order: 10 },
  { name: 'Django', logo: 'https://cdn.simpleicons.org/django/FFFFFF', description: 'Python framework for secure and rapid backend development.', category: 'Backend', order: 11 },
  { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', description: 'Utility-first CSS workflow for clean and fast UI building.', category: 'Frontend', order: 12 },
  { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/FFFFFF', description: 'Relational database design and SQL query optimization.', category: 'Databases', order: 13 },
  { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248', description: 'Document database modeling for modern app backends.', category: 'Databases', order: 14 },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032', description: 'Version control, branching workflows, and team collaboration.', category: 'Tools', order: 15 },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/FFFFFF', description: 'Repository management, collaboration, and project hosting.', category: 'Tools', order: 16 },
  { name: 'Postman', logo: 'https://cdn.simpleicons.org/postman/FF6C37', description: 'API testing, debugging, and endpoint documentation.', category: 'Tools', order: 17 },
  { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', description: 'Primary development environment for efficient coding workflows.', category: 'Tools', order: 18 },
];

export const seedAchievements = [
  {
    title: 'Top 10 Position - Hack-Verse Hackathon',
    subtitle: 'Intra-University Innovation Competition',
    year: 'Mar 2024',
    description: 'Ranked in Top 10 position at Hack-Verse, an intra-university hackathon showcasing innovative problem-solving and technical implementation skills.',
    icon: 'trophy',
    order: 1,
  },
  {
    title: 'Rank 4 - Concoction Hackathon',
    subtitle: 'Intra-University Tech Fusion Competition',
    year: 'Mar 2024',
    description: 'Attained Rank 4 in Concoction, an intra-university tech fusion hackathon, demonstrating strong coding and collaborative teamwork abilities.',
    icon: 'award',
    order: 2,
  },
  {
    title: 'Chhalaang NGO Contribution',
    subtitle: 'Educational & Community Development',
    year: 'Jun 2024',
    description: 'Contributed to Chhalaang NGO initiative focused on enhancing educational and physical development resources for children in rural communities.',
    icon: 'user-round-check',
    order: 3,
  },
];

export const seedCertificates = [
  {
    title: 'Built Generative AI Apps and Solutions with No-Code Tools',
    issuer: 'Udemy',
    date: 'Aug 2025',
    credentialId: 'UDEMY-GEN-AI-2025',
    credentialLink: 'https://udemy.com/course/generative-ai-no-code',
    icon: 'award',
    order: 1,
  },
  {
    title: 'Master Generative AI & Generative AI tools (ChatGPT & more)',
    issuer: 'Udemy',
    date: 'Aug 2025',
    credentialId: 'UDEMY-MASTER-AI-2025',
    credentialLink: 'https://udemy.com/course/master-generative-ai',
    icon: 'award',
    order: 2,
  },
  {
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Google Coursera',
    date: 'Sep 2024',
    credentialId: 'COURSERA-NETWORK-2024',
    credentialLink: 'https://coursera.org/learn/computer-networking',
    icon: 'award',
    order: 3,
  },
  {
    title: 'Introduction to Hardware and Operating Systems',
    issuer: 'IBM Coursera',
    date: 'Sep 2024',
    credentialId: 'COURSERA-HW-OS-2024',
    credentialLink: 'https://coursera.org/learn/operating-systems',
    icon: 'award',
    order: 4,
  },
];
