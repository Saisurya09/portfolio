export const personalInfo = {
  name: "Ambati SaiSurya",
  role: "Software Developer",
  statusPill: "B.Tech CSE, KL University, graduated 2026",
  lede: "A determined, rational thinker who enjoys creating and refining software, especially for large-scale and financial uses. Well-versed in databases, virtualization, Git and object-oriented programming, and comfortable working with teams from different backgrounds.",
  email: "saisuryaambati0907@gmail.com",
  phone: "+91 90597 16605",
  location: "Hyderabad, India",
  educationSnippet: "B.Tech CSE, CGPA 8.74",
  avatar: "/avatar.jpg"
};

export const projects = [
  {
    id: "game-server",
    title: "Multiplayer game server",
    subtitle: "Cloud and real-time",
    category: "Cloud",
    description: "A real-time multiplayer game in plain JavaScript on server and client, hosted on AWS EC2 with WebSocket communication and a multi-server setup.",
    tags: ["AWS EC2", "WebSockets", "JavaScript", "Node.js", "Real-Time"]
  },
  {
    id: "hotel-management",
    title: "Hotel management system",
    subtitle: "Full stack",
    category: "Full Stack",
    description: "An end-to-end hotel booking application with a PostgreSQL database, Spring Boot services, React user interface, and a Jenkins CI/CD pipeline.",
    tags: ["Spring Boot", "React.js", "PostgreSQL", "Jenkins", "REST APIs"]
  },
  {
    id: "object-detection",
    title: "Object detection tool",
    subtitle: "Computer vision",
    category: "AI & Vision",
    description: "A real-time computer vision system that detects multiple object classes with high precision and low latency.",
    tags: ["YOLOv5", "OpenCV", "Python", "Deep Learning"]
  },
  {
    id: "face-recognition",
    title: "Face recognition system",
    subtitle: "Security",
    category: "Security",
    description: "A biometric face detection and verification application built with a modular architecture and reusable Python modules.",
    tags: ["CNN", "OpenCV", "Haar Cascades", "Python"]
  }
];

export const skillCategories = [
  {
    category: "Languages",
    skills: ["C", "Java", "Python", "JavaScript"]
  },
  {
    category: "Web and Frontend",
    skills: ["React.js", "Node.js", "AngularJS", "Vue.js", "jQuery", "Bootstrap", "HTML5", "CSS3", "ES6+", "TypeScript"]
  },
  {
    category: "Frameworks",
    skills: ["Spring Boot", "Flask", "Django", "Express.js"]
  },
  {
    category: "Databases and Cache",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Oracle", "Redis", "Elasticsearch"]
  },
  {
    category: "Cloud and DevOps",
    skills: ["AWS", "Azure", "Heroku", "Docker", "Jenkins", "Git", "Perforce"]
  },
  {
    category: "Working Style",
    skills: ["Analytical Thinking", "Problem Solving", "Teamwork", "Documentation", "Communication"]
  }
];

export const certifications = [
  {
    badge: "AWS",
    badgeLabel: "Foundational",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services Training and Certification",
    validity: "Expires Mar 11, 2029",
    url: "https://www.credly.com/earner/earned/badge/81560a28-3c06-49eb-9bfd-d610669392f1"
  },
  {
    badge: "MDB",
    badgeLabel: "Associate",
    title: "MongoDB Associate Developer",
    issuer: "MongoDB",
    validity: "Issued Apr 8, 2026",
    url: "https://www.credly.com/earner/earned/badge/4ada8583-ac04-4e3d-bb45-aeba0e7617ab"
  },
  {
    badge: "IBM",
    badgeLabel: "IBM Skills Network",
    title: "IBM certificate, AI0121EN",
    issuer: "Course completion certificate from IBM Skills Network.",
    validity: "Verified Credential",
    url: "https://courses.etrain.skillsnetwork.site/certificates/e78d2c8b47e9465c897f3243d6eba752"
  }
];

export const educationList = [
  {
    period: "2022 to 2026",
    institution: "KL University",
    degree: "B.Tech, Computer Science and Engineering",
    score: "8.74",
    scoreLabel: "CGPA"
  },
  {
    period: "2020 to 2022",
    institution: "Sri Chaitanya Junior College",
    degree: "Intermediate (MPC)",
    score: "907",
    scoreLabel: "out of 1000"
  },
  {
    period: "2017 to 2020",
    institution: "Sri Chaitanya Techno School",
    degree: "High school",
    score: "10",
    scoreLabel: "CGPA"
  }
];

export const activities = [
  {
    title: "Hackathons",
    description: "Built financial and productivity tools against tight deadlines at college hackathons, focusing on speed and real-time backend reliability."
  },
  {
    title: "Workshops",
    description: "Attended intensive hands-on sessions on cloud computing architectures, backend microservices, and DevOps automation practices."
  },
  {
    title: "Open Source",
    description: "Contributed bug fixes, architectural documentation, and new feature implementations to various open-source developer tool repositories."
  }
];
