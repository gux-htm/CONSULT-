export const COMPANY_INFO = {
    vision: "To be the most trusted and transformative educational consultancy in Pakistan, empowering students to become globally competitive, ethically grounded leaders who shape the future of an interconnected world.",
    mission: "Our mission is to provide end-to-end, personalized guidance that turns academic aspirations into tangible global opportunities. Through expert mentorship, strategic planning, and unwavering integrity, we equip students with the clarity, confidence, and competence needed to excel in top-tier international education systems.",
    intro: "Established in 2022 and formally registered with the Securities and Exchange Commission of Pakistan (SECP) in 2025, AZM Consultants Faisalabad is a premier, fully compliant educational consultancy built on a foundation of integrity, expertise, and transformative mentorship."
};

export const SERVICES = [
    {
        title: "Study Abroad Consultancy",
        description: "Personalized roadmaps for students targeting premier destinations worldwide including UK, USA, Canada, Australia, Europe, and China. We don't just process applications—we build futures.",
        icon: "Globe"
    },
    {
        title: "Scholarship Assistance",
        description: "Expert guidance for high-achieving students, including specialized support for the Chinese Government Scholarship (CSC/CGS) which covers tuition, accommodation, and provides a stipend.",
        icon: "Award"
    },
    {
        title: "Language Test Preparation",
        description: "Comprehensive preparation for IELTS, PTE, TOEFL, and Duolingo. Our Language Center equips students with strategies to achieve competitive scores.",
        icon: "BookOpen"
    },
    {
        title: "Visa & Legal Guidance",
        description: "In-house legal expertise ensuring every application process is diligent, secure, and compliant. We assist with study permits, post-study work pathways, and documentation.",
        icon: "FileCheck"
    }
];

export const TEAM_MEMBERS = [
    {
        name: "Ali Nawaz",
        role: "CEO",
        bio: "A dynamic leader and serial entrepreneur with an M.Phil in Supply Chain Management. Ali brings a strategic, results-driven approach, ensuring services are built on operational excellence.",
        image: "https://ui-avatars.com/api/?name=Ali+Nawaz&background=1E3A8A&color=fff"
    },
    {
        name: "Faisal Sultan Sandhu",
        role: "Partner & Legal Advisor",
        bio: "Advocate High Court and Member Bar Council Faisalabad. With 17 years of service in Punjab Police and deep legal acumen, Faisal ensures all operations are ethically sound and legally robust.",
        image: "https://ui-avatars.com/api/?name=Faisal+Sultan&background=B91C1C&color=fff"
    },
    {
        name: "Dr. Muhammad Asim Nawaz",
        role: "Mentor",
        bio: "Assistant Professor with a PhD in Management from USTC China and 15 years of experience. He bridges the gap between academic expectations and successful student placement.",
        image: "https://ui-avatars.com/api/?name=Asim+Nawaz&background=0F172A&color=fff"
    },
    {
        name: "Gohar Batool",
        role: "Consultant",
        bio: "MBA and Master's in Physical Sciences. Gohar combines business acumen with a background in Psychology to provide empathetic, informed, and strategic advice to students.",
        image: "https://ui-avatars.com/api/?name=Gohar+Batool&background=1E3A8A&color=fff"
    },
    {
        name: "Umer Sharif",
        role: "Consultant",
        bio: "Specializes in admissions for China, UK, and Portugal. Umer brings a results-driven approach and client-centric philosophy to help students navigate complex educational pathways.",
        image: "https://ui-avatars.com/api/?name=Umer+Sharif&background=1E3A8A&color=fff"
    },
    {
        name: "Zain Mobeen",
        role: "Consultant",
        bio: "Specializing in UK, Australia, and New Zealand. Zain leverages his dual perspective as a consultant and current student to connect deeply with clients.",
        image: "https://ui-avatars.com/api/?name=Zain+Mobeen&background=1E3A8A&color=fff"
    }
];

export const COUNTRY_DETAILS: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
}> = {
    uk: {
        title: "United Kingdom",
        subtitle: "Why Choose the UK for Your Studies?",
        description: "Globally Recognised & Respected Qualifications. UK degrees are held in the highest esteem by employers and universities worldwide. With shorter, intensive courses (3 years undergrad, 1 year master's), you graduate faster.",
        features: [
            "Graduate Route visa allows 2-3 years post-study work",
            "World-Leading Universities & Research (Oxford, Cambridge, etc.)",
            "A Multicultural Hub enriching your global perspective",
            "Gateway to Europe & Beyond"
        ]
    },
    fr: {
        title: "France",
        subtitle: "Embrace Excellence and Innovation",
        description: "As a global leader in arts, science, business, and engineering, France provides an immersive academic experience. Choosing France means investing in a future where rigorous scholarship meets a cosmopolitan lifestyle.",
        features: [
            "Remarkably Affordable Tuition Fees at public universities",
            "Home to world-renowned Grandes Écoles",
            "Post-Study Work Opportunities for graduates",
            "Strong Focus on Industry Links and internships"
        ]
    },
    de: {
        title: "Germany",
        subtitle: "Engineer Your Future",
        description: "Renowned for its robust engineering and strong industrial economy, a German degree is a passport to global career opportunities. Most public universities charge no tuition fees for international students.",
        features: [
            "Tuition-Free or Very Low-Cost Education",
            "World-Leading in Engineering & Technology",
            "18-Month Post-Study Work Visa",
            "Strong Economy with opportunities at companies like Siemens, VW"
        ]
    },
    ie: {
        title: "Ireland",
        subtitle: "Your Gateway to a Global Career",
        description: "Ireland is a premier English-speaking gateway to Europe and a global technology hub. Home to tech giants like Google and Meta, it offers prestigious qualifications and rich cultural immersion.",
        features: [
            "Generous Post-Study Work Opportunities (up to 2 years)",
            "Global Hub for Tech & Innovation",
            "English-Speaking Advantage in the EU",
            "World-Class Universities like Trinity College Dublin"
        ]
    },
    pt: {
        title: "Portugal",
        subtitle: "Discover New Horizons",
        description: "Combining internationally recognized academic programs with a uniquely relaxed lifestyle and low cost of living, Portugal offers a holistic study abroad experience under the sun.",
        features: [
            "Exceptional Value & Low Cost of Living",
            "Safe, Sunny, and High Quality of Life",
            "Rising Hub for Technology & Innovation",
            "Post-Study Work Opportunities for non-EU graduates"
        ]
    },
    cy: {
        title: "Cyprus",
        subtitle: "A Mediterranean Jewel for Your Education",
        description: "An EU member state at the crossroads of Europe, Asia, and Africa. Cyprus offers English-taught degrees, affordable tuition, and a safe lifestyle with over 300 days of sunshine.",
        features: [
            "Affordable Tuition & Cost of Living",
            "English-Taught Programs in an EU Setting",
            "Pathway to European Opportunities",
            "Straightforward Admissions Process"
        ]
    },
    ge: {
        title: "Georgia",
        subtitle: "Where Tradition Meets Tomorrow",
        description: "Affordable, culturally rich, and strategically located. Georgia offers English-medium education, particularly in medicine (MBBS), business, and IT, with minimal entry barriers.",
        features: [
            "Exceptional Affordability",
            "High-Quality, English-Medium Education (MBBS recognized by WHO)",
            "Simple & Straightforward Admissions Process",
            "Safe, Welcoming, and Culturally Rich"
        ]
    },
    mt: {
        title: "Malta",
        subtitle: "Study in the Heart of the Mediterranean",
        description: "A safe, welcoming EU member where English is an official language. Malta is a hub for iGaming, finance, and blockchain, offering a unique package of academic excellence and island life.",
        features: [
            "English as an Official Language",
            "High-Quality EU Education",
            "Growing Hub for iGaming & Finance",
            "Gateway to Europe & North Africa"
        ]
    },
    ca: {
        title: "Canada",
        subtitle: "Your Future, Amplified",
        description: "Renowned for world-class research, inclusivity, and strong pathways to permanent residency (PGWP). A Canadian education is an investment in a future defined by excellence and opportunity.",
        features: [
            "Direct Pathway to Permanent Residency (PGWP)",
            "World-Class Education & Research Powerhouse",
            "Multicultural and Inclusive Society",
            "Safe, Stable, and High Quality of Life"
        ]
    },
    au: {
        title: "Australia",
        subtitle: "Shape Your Future Under the Southern Sun",
        description: "Renowned for top-ranking universities (Group of Eight) and a lifestyle that balances academic rigor with outdoor adventure. Australia offers strong post-study work rights (2-4 years).",
        features: [
            "Globally Renowned Universities & Practical Education",
            "Post-Study Work Rights & Pathways",
            "Thriving Job Market in Key Sectors",
            "Outstanding Quality of Life"
        ]
    },
    nz: {
        title: "New Zealand",
        subtitle: "New Horizons in Education",
        description: "A landscape of breathtaking natural beauty and innovation. New Zealand offers forward-thinking academic approaches and a Post-study Work Visa for up to 3 years.",
        features: [
            "World-Renowned Education System",
            "Exceptional Post-Study Work Pathways",
            "Work Rights During Studies",
            "Unparalleled Focus on Student Well-being"
        ]
    },
    se: {
        title: "Sweden",
        subtitle: "Innovate Your Future",
        description: "A global leader in innovation, sustainability, and equality. Sweden emphasizes critical thinking and collaboration. Tuition-free for EU/EEA students, with scholarships available for others.",
        features: [
            "World-Leading in Innovation & Sustainability",
            "Post-Study Work Opportunities (up to 12 months)",
            "Strong English-Taught Program Offerings",
            "Collaborative & Student-Centric Learning"
        ]
    },
    fi: {
        title: "Finland",
        subtitle: "Where Education Meets Innovation and Nature",
        description: "Home to the world's best education system. Finland offers a learner-centric approach and is a leader in technology, design, and clean energy.",
        features: [
            "Home to the World's Best Education System",
            "Post-Study Work Opportunities",
            "A Leader in Technology & Sustainability",
            "Unmatched Quality of Life & Safety"
        ]
    },
    us: {
        title: "United States",
        subtitle: "Unleash Your Potential",
        description: "The definitive destination for higher education with the world's most prestigious universities (Ivy League, etc.). Offers unmatched academic choice, research leadership, and OPT opportunities.",
        features: [
            "Unmatched Academic Choice & Flexibility",
            "Optional Practical Training (OPT) Opportunities",
            "Home to World's Top-Ranked Universities",
            "Pathway to a Global Career Network"
        ]
    },
    cn: {
        title: "China",
        subtitle: "Excel with Excellence: CSS Scholarship",
        description: "A rising academic superpower. The Chinese Government Scholarship (CSC) offers full financial support (tuition, accommodation, stipend) for Master's and PhD students.",
        features: [
            "Full Financial Support via CSS Scholarship",
            "World-Class Research & Modern Facilities",
            "Strategic Career Advantage in 2nd largest economy",
            "Exclusive September Intake"
        ]
    },
    it: {
        title: "Italy",
        subtitle: "Where Heritage Meets Innovation",
        description: "The cradle of the Renaissance and a leader in design and engineering. Italy offers affordable tuition at prestigious universities and an immersion in 'La Dolce Vita'.",
        features: [
            "World-Renowned Academic Heritage & Affordable Education",
            "Global Leader in Design, Architecture & Engineering",
            "Post-Study Opportunities in the Heart of Europe",
            "English-Taught Programs Increasingly Available"
        ]
    },
    es: {
        title: "Spain",
        subtitle: "Passion, Progress, and Possibility",
        description: "A hub of creativity and innovation. Spain offers high-quality education at exceptional value and is a gateway to the Spanish-speaking world.",
        features: [
            "High-Quality Education at an Exceptional Value",
            "Post-Study Opportunities in a Dynamic EU Economy",
            "Unbeatable Quality of Life & Cultural Richness",
            "Gateway to the Spanish-Speaking World"
        ]
    },
    pk: {
        title: "Pakistan",
        subtitle: "Home Base",
        description: "AZM Consultants is proudly based in Faisalabad, Pakistan, serving students nationwide with integrity and expertise.",
        features: [
            "Head Office in Faisalabad",
            "Registered with SECP",
            "Tax-Filing Organization",
            "Nationwide Student Base"
        ]
    }
};