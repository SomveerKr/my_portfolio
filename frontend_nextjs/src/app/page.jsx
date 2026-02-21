import { client } from '@/lib/sanity';

import Header from '@/components/sections/Header';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Skills from '@/components/sections/Skills';
import Testimonial from '@/components/sections/Testimonial';
import Footer from '@/components/sections/Footer';

// Server-side data fetching (SSR)
async function getSanityData() {
    const [abouts, works, skills, experiences, testimonials] = await Promise.all([
        client.fetch('*[_type == "abouts"]'),
        client.fetch('*[_type == "works"]'),
        client.fetch('*[_type == "skills"]'),
        client.fetch('*[_type == "experiences"]'),
        client.fetch('*[_type == "testimonials"]'),
        // client.fetch('*[_type == "brands"]'),
    ]);

    return { abouts, works, skills, experiences, testimonials };
}

export default async function Home() {
    const { abouts, works, skills, experiences, testimonials } = await getSanityData();

    return (
        <main>
            <Header />
            <About abouts={abouts} />
            <Work works={works} />
            <Skills skills={skills} experiences={experiences} />
            <Testimonial testimonials={testimonials}
            // brands={brands} 
            />
            <Footer />
        </main>
    );
}
