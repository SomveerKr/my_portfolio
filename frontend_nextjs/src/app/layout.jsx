import './globals.css';
import '@/styles/App.scss';
import Navbar from '@/components/Navbar/Navbar';

export const metadata = {
    metadataBase: new URL('https://somveerkumar.netlify.app'),
    title: 'Somveer Kumar | Full Stack Developer & Legal Tech Expert',
    description:
        'Somveer Kumar — Full Stack Web Developer, Software Engineer & Legal Tech Expert based in India. Specializing in React, Node.js, Python, MERN stack, web scraping, and legal technology solutions. View my portfolio, projects, and get in touch.',
    keywords: [
        'Somveer Kumar',
        'web developer',
        'software developer',
        'full stack developer',
        'legal tech',
        'legal technology',
        'React developer',
        'Python developer',
        'Node.js developer',
        'MERN stack developer',
        'web scraping',
        'India developer',
        'software engineer',
        'portfolio',
        'frontend developer',
        'backend developer',
    ],
    authors: [{ name: 'Somveer Kumar' }],
    robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: '/',
        title: 'Somveer Kumar | Full Stack Developer & Legal Tech Expert',
        description:
            'Full Stack Web Developer & Legal Tech Expert. Specializing in React, Node.js, Python, MERN stack, and legal technology solutions. Explore my portfolio.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Somveer Kumar - Full Stack Developer & Legal Tech Expert Portfolio',
            },
        ],
        siteName: 'Somveer Kumar Portfolio',
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Somveer Kumar | Full Stack Developer & Legal Tech Expert',
        description:
            'Full Stack Web Developer & Legal Tech Expert. React, Node.js, Python, MERN stack developer. View my portfolio and projects.',
        images: ['/og-image.png'],
        creator: '@Code_Veer',
    },
    icons: {
        icon: '/favicon.png',
    },
    other: {
        'theme-color': '#000000',
    },
};

// JSON-LD Structured Data
const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Somveer Kumar',
    url: 'https://somveerkumar.netlify.app',
    image: 'https://somveerkumar.netlify.app/favicon.png',
    jobTitle: 'Full Stack Developer & Legal Tech Expert',
    description:
        'Full Stack Web Developer and Legal Technology Expert specializing in React, Node.js, Python, MERN stack, web scraping, and building legal tech solutions.',
    knowsAbout: [
        'Full Stack Web Development',
        'React.js',
        'Node.js',
        'Python',
        'JavaScript',
        'MERN Stack',
        'Web Scraping',
        'Legal Technology',
        'Software Development',
        'Next.js',
        'Tailwind CSS',
        'REST APIs',
        'MongoDB',
        'Express.js',
    ],
    sameAs: [
        'https://github.com/SomveerKr',
        'https://www.linkedin.com/in/somveerkumar/',
        'https://twitter.com/Code_Veer',
        'https://www.instagram.com/code.veer/',
        'https://www.youtube.com/@CodeVeer',
    ],
    email: 'work.somveerk@gmail.com',
    alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Law School',
    },
    worksFor: {
        '@type': 'Organization',
        name: 'Freelance / Self-Employed',
    },
};

const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Somveer Kumar Portfolio',
    url: 'https://somveerkumar.netlify.app',
    description: 'Portfolio of Somveer Kumar — Full Stack Developer & Legal Tech Expert',
    author: {
        '@type': 'Person',
        name: 'Somveer Kumar',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://cdn.sanity.io" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
                />
            </head>
            <body>
                <div className="app">
                    <Navbar />
                    {children}
                </div>

                {/* Noscript fallback for crawlers */}
                <noscript>
                    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
                        <h1>Somveer Kumar — Full Stack Developer &amp; Legal Tech Expert</h1>
                        <p>
                            Welcome to the portfolio of <strong>Somveer Kumar</strong>, a passionate <strong>Full Stack Web Developer</strong>
                            and <strong>Legal Technology Expert</strong> based in India.
                        </p>
                        <h2>Skills &amp; Expertise</h2>
                        <ul>
                            <li>Full Stack Web Development (React, Node.js, Express, MongoDB)</li>
                            <li>Python Development &amp; Web Scraping</li>
                            <li>Legal Technology Solutions</li>
                            <li>Next.js &amp; Modern Frontend Frameworks</li>
                            <li>REST API Design &amp; Development</li>
                            <li>Bot Development &amp; Automation</li>
                        </ul>
                        <h2>Contact</h2>
                        <p>Email: <a href="mailto:work.somveerk@gmail.com">work.somveerk@gmail.com</a></p>
                        <p>
                            <a href="https://github.com/SomveerKr">GitHub</a> |
                            <a href="https://www.linkedin.com/in/somveerkumar/">LinkedIn</a> |
                            <a href="https://twitter.com/Code_Veer">Twitter</a>
                        </p>
                    </div>
                </noscript>
            </body>
        </html>
    );
}
