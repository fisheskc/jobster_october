import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import data from './mock-data.json';
// import { PrismaD1 } from '@prisma/adapter-d1';
// Define the shape of your job data
interface Job {
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
  createdAt: string;
}


// import { R } from '@tanstack/react-query-devtools/build/legacy/ReactQueryDevtools-ChNsB-ya';

async function main() {


  const clerkId = 'user_36zYrQjwXPa82RevgfVCHv94bib'

  // We first iterate over those jobs & add the clerk ID
  // We assign a specific user
  const jobs = data.map((job: Job) => ({ ...job, clerkId }));
    
    for (const job of jobs) {
    await prisma.job.create({ data: job });
  }
}
  // We add every job to a database
 
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });