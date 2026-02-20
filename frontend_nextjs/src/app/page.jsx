import { client } from '@/lib/sanity';

import Header from '@/components/sections/Header';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Skills from '@/components/sections/Skills';
import Footer from '@/components/sections/Footer';

// Server-side data fetching (SSR)
async function getSanityData() {
    const [abouts, works, skills, experiences] = await Promise.all([
        client.fetch('*[_type == "abouts"]'),
        client.fetch('*[_type == "works"]'),
        client.fetch('*[_type == "skills"]'),
        client.fetch('*[_type == "experiences"]'),
    ]);

    return { abouts, works, skills, experiences };
}

export default async function Home() {
    const { abouts, works, skills, experiences } = await getSanityData();

    return (
        <main>
            <Header />
            <About abouts={abouts} />
            <Work works={works} />
            <Skills skills={skills} experiences={experiences} />
            {/* <Testimonial testimonials={testimonials} brands={brands} /> */}
            <Footer />
        </main>
    );
}
