export const profile = {
  name: { first: "YASH", last: "KHARTODE" },
  tagline: "AI • ML • MERN • CLOUD",
  subtitle:
    "AI/ML Engineer • Software Engineer • MERN Stack Developer • Cloud & Agentic AI Enthusiast",
  description:
    "Expanding skills in Artificial Intelligence, Machine Learning, and Agentic AI while developing practical projects in web development and data-driven solutions.",
  about:
    "I am an AI/ML Engineer and Software Engineer passionate about building intelligent systems and scalable web applications. My work focuses on machine learning, data-driven solutions, MERN stack development, cloud technologies, and emerging Agentic AI systems. I enjoy transforming ideas into practical products that solve real-world problems.",
  email: "yashkhartode1004@gmail.com",
  phone: "+91 9579602987",
  location: "Nashik, Maharashtra, India",
  links: {
    linkedin: "https://linkedin.com/in/yashkhartode",
    github: "https://github.com/yashkhartode",
    portfolio: "https://yashkhartode.dev",
  },
};

export const navItems = [
  { label: "YK", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    id: "house-price-prediction",
    title: "House Price Prediction",
    duration: "Apr 2026",
    stack: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    points: [
      "Analyzed and preprocessed datasets using Python, Pandas, and SQL",
      "Performed EDA to identify patterns and support data-driven decisions",
      "Developed and evaluated machine learning models for predictive analytics",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "smart-grid-nashik",
    title: "Smart Grid Nashik",
    duration: "Feb 2026",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript", "HTML5", "Tailwind CSS"],
    points: [
      "Developed a MERN Stack Smart Electricity Complaint & Monitoring System",
      "Built User, Admin, and Technician modules",
      "Implemented secure authentication, role-based access, complaint tracking, and dashboards",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "vendor-invoice-intelligence-portal",
    title: "Vendor Invoice Intelligence Portal",
    duration: "May 2026",
    stack: ["Python", "Streamlit", "Pandas", "NumPy", "Scikit-learn", "Joblib", "Plotly", "SQLite"],
    points: [
      "Built a machine-learning-based invoice intelligence portal",
      "Implemented Freight Cost Prediction using regression",
      "Added Invoice Flagging using classification models trained on SQLite data",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "smart-hire",
    title: "Smart Hire",
    duration: "Sep 2025 – Dec 2025",
    stack: ["Django", "Python", "OpenAI API", "HTML", "CSS", "JavaScript", "SQLite"],
    points: [
      "Developed an AI-based recruitment web application",
      "Integrated OpenAI API for intelligent automation",
      "Streamlined candidate management for HR workflows",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "shop-nest",
    title: "Shop Nest",
    duration: "Dec 2024 – Apr 2025",
    stack: ["Django", "Python", "Razorpay", "HTML", "CSS", "JavaScript", "SQLite"],
    points: [
      "Developed an e-commerce shopping website",
      "Integrated Razorpay payment gateway",
      "Implemented cart management and secure online ordering",
    ],
    github: "#",
    demo: "#",
  },
];

export const skills = {
  Languages: ["Python", "SQL", "NoSQL", "JavaScript", "HTML5", "CSS3"],
  "Frameworks & Libraries": [
    "React.js",
    "Node.js",
    "Express.js",
    "Streamlit",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "Scikit-Learn",
  ],
  Databases: ["MongoDB", "MySQL"],
  Tools: ["Git", "GitHub", "VS Code", "Power BI", "Jupyter Notebook"],
  Deployment: ["Vercel", "Render", "Streamlit Community Cloud"],
};

export const experience = [
  {
    id: "wheeltrix",
    role: "Data Science & Analytics Intern",
    org: "Wheeltrix",
    meta: "Remote, Nashik",
    duration: "Jun 2026 – Aug 2026",
    points: [
      "Analyzed and preprocessed datasets using Python, Pandas, and SQL",
      "Performed exploratory data analysis to identify patterns",
      "Developed and evaluated machine learning models for predictive analytics",
    ],
  },
  {
    id: "techready",
    role: "Backend Developer Intern",
    org: "TechReady IT Solutions",
    meta: "Offline, Nashik",
    duration: "Jan 2026",
    points: [
      "Built backend features for a MERN Stack Quiz Application",
      "Developed REST APIs and database integration",
      "Collaborated on testing and improving application functionality",
    ],
  },
];

export const education = [
  {
    id: "kkwioer",
    school: "K.K. Wagh Institute of Engineering Education and Research",
    degree: "Master in Computer Applications",
    duration: "2025 – Present",
    score: "SGPA: 7.6",
    location: "Nashik, Maharashtra",
  },
  {
    id: "kkw-acs-cs",
    school: "K.K. Wagh ACS & CS College",
    degree: "B.Sc. Computer Science",
    duration: "2022 – 2025",
    score: "CGPA: 8.95",
    location: "Chandori, Maharashtra",
  },
  {
    id: "ldp-junior-college",
    school: "L. D. P. Junior College",
    degree: "HSC",
    duration: "2020 – 2022",
    score: "71.17%",
    location: "Lasalgaon, Maharashtra",
  },
  {
    id: "mvm-cbse",
    school: "Maharishi Vidya Mandir, CBSE School",
    degree: "SSC",
    duration: "2019 – 2020",
    score: "56.20%",
    location: "Kopargaon, Maharashtra",
  },
];

export const achievements = [
  {
    id: "oracle-agentic-ai",
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle",
    date: "Jul 2026",
  },
  {
    id: "oracle-oci",
    title: "Oracle Cloud Infrastructure Certified Foundations Associate",
    issuer: "Oracle",
    date: "Jul 2026",
  },
  {
    id: "ibm-ml-python",
    title: "Machine Learning with Python",
    issuer: "IBM",
    date: "May 2026",
  },
  {
    id: "ibm-data-analysis",
    title: "Data Analysis with Python",
    issuer: "IBM",
    date: "May 2026",
  },
  {
    id: "ibm-python-ds",
    title: "Python for Data Science",
    issuer: "IBM",
    date: "May 2026",
  },
];
