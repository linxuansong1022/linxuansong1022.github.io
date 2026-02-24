// ===== YOUR REAL INFORMATION =====
// Edit this file to update your portfolio content.

export const personalInfo = {
    name: "Linxuan Song",
    initials: "L.S.",
    title: "MSc CS Student @ DTU",
    bio: [
        "I'm a M.Sc. student in Computer Science and Engineering at the Technical University of Denmark (DTU). My interests span AI, embedded systems, and full-stack development.",
        "I'm passionate about building intelligent systems and creative projects with cutting-edge technology. Get in touch and let's take it from there."
    ]
};

export const experiences = [
    {
        date: "09/2025 – 06/2027",
        title: "M.Sc. Computer Science & Engineering",
        org: "Technical University of Denmark (DTU), Lyngby, Denmark",
        desc: "Master's program focusing on computer science and engineering."
    },
    {
        date: "02/2025 – 06/2025",
        title: "Research Intern — AI Application Research Center",
        org: "Dalian Maritime University, Dalian, China",
        desc: "Developed a transfer learning framework for DDPM, improving image classification accuracy by 4.06% over ViT baseline. Engineered a 1D regression model for ocean wave height prediction, reducing MSE by 54.4% vs. baseline."
    },
    {
        date: "09/2021 – 06/2025",
        title: "B.Eng. Electronic Information Engineering",
        org: "Dalian Maritime University, Dalian, China",
        desc: "GPA: 86.4/100 (3.64/5.0). Third Prize in the 6th National College Embedded Chip and System Design Competition (2023)."
    },
    {
        date: "09/2021 – 06/2025",
        title: "College Soccer Team Member",
        org: "Dalian Maritime University",
        desc: "Runner-up in 2022 campus league and championship winner in 2023. Enhanced team strategy and coordination."
    },
    {
        date: "09/2021 – 06/2025",
        title: "Sea Breeze Club — Subtitling Team",
        org: "Dalian Maritime University",
        desc: "Translated open-source computer science courses, improving accessibility and aiding students' learning experience."
    }
];

export const projects = [
    {
        title: "Diffusion-Classification-Regression",
        date: "October 2025 – Present",
        desc: "Transfer learning framework for DDPM — image classification +4.06% over ViT, ocean wave height prediction MSE -54.4%. ⭐ 82 stars on GitHub.",
        tags: ["python", "pytorch", "diffusion"],
        links: { github: "https://github.com/linxuansong1022/Diffusion-Classification-Regression" }
    },
    {
        title: "Chinese Culinary GraphRAG",
        date: "October 2024 – Present",
        desc: "Hybrid retrieval system with Neo4j knowledge graph + Milvus vector store. ~35% retrieval recall improvement over FAISS/Chroma baseline.",
        tags: ["python", "neo4j", "langchain"],
        links: { github: "https://github.com/linxuansong1022/MyRAG" }
    },
    {
        title: "Care Plan Generator",
        date: "February 2026",
        desc: "AI-powered care plan generation with Django backend, Celery async tasks, Gemini API integration, and PostgreSQL.",
        tags: ["python", "django", "docker"],
        links: { github: "https://github.com/linxuansong1022/care-plan-generator" }
    },
    {
        title: "CPH Beer Map",
        date: "January 2026",
        desc: "Interactive map of Copenhagen craft beer bars built with TypeScript and deployed on Vercel.",
        tags: ["typescript", "react", "vercel"],
        links: {
            github: "https://github.com/linxuansong1022/cph-beer-map",
            demo: "https://cph-beer-map.vercel.app"
        }
    },
    {
        title: "Job Search Automation",
        date: "February 2026",
        desc: "Autonomous job search pipeline with async scraping, AI-powered scoring, and notification system.",
        tags: ["python", "async", "gemini"],
        links: { github: "https://github.com/linxuansong1022/FxxkJobSearch" }
    },
    {
        title: "Hardware-Software Codesign",
        date: "February 2026",
        desc: "DTU course work on hardware-software codesign, focusing on embedded systems and C programming.",
        tags: ["c", "embedded"],
        links: { github: "https://github.com/linxuansong1022/Hardware-Software-Codesign" }
    },
    {
        title: "Personal Portfolio",
        date: "February 2026",
        desc: "This website! React + Vite + p5.js + Tone.js. Monospace minimalist design with interactive sounds & colors.",
        tags: ["react", "javascript"],
        links: { github: "https://github.com/linxuansong1022" }
    }
];

export const allTags = [
    "python", "pytorch", "diffusion", "neo4j", "langchain",
    "django", "docker", "typescript", "react", "javascript",
    "vercel", "async", "gemini", "c", "embedded"
];

export const socialLinks = [
    { name: "GitHub", url: "https://github.com/linxuansong1022", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/linxuan-song-5a6614381/", icon: "linkedin" },
    { name: "Email", url: "mailto:linxuansong1022@outlook.com", icon: "envelope" }
];
