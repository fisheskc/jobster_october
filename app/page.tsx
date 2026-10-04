
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from "@/components/global/container";
// import LandingImg from '../assets/main.svg';
// import SharedLayout from './SharedLayout';
import Landing from './landing/page';


export default function Home() {
  return (
     <Container className="py-20 px-4 sm:px-8 lg:px-16">
     <main className='grid lg:grid-cols-5'>
      <section className='max-w-6xl mx-auto px-4 sm:px-8 h-screen grid lg:grid-cols-[1fr,400px] items-center'>
      <div>
      <h1 className="capitalize text-4xl md:text-7xl font-bold">
        job <span className="text-primary">tracking</span> app
      </h1>
      <p className="leading-loose max-w-md mt-4">
        I am baby wayfarers hoodie next level taiyaki brooklyn cliche blue
        bottle single-origin coffee chia...
      </p>
      <div className="mt-12 mb-12">
        {/* <SharedLayout /> */}
      </div>
      <div className="mt-12 mb-12">
        <Landing />
      </div>
      <Button asChild type="button" className="mt-4 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-white">
        <Link href="/admin/add-job">Get Started</Link>
      </Button>
    </div>
       
      {/* <Image src={LandingImg} alt="landing" className="hidden lg:block" /> */}
      </section>
    </main>
    </Container>
  );
}
