// Type definition for a Job object coming from your Prisma schema / API layer
import { JobType } from '@/utils/types';
// Icons used inside the JobInfo components
import { MapPin, Briefcase, CalendarDays, RadioTower} from 'lucide-react';
// Next.js link component for client-side navigation
import Link from 'next/link';
// ShadCN UI card components for layout and structure
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// Divider line between header and content
import { Separator } from './ui/separator';
// ShadCN button + badge components
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import JobInfo from './Jobinfo';
// Utility for formatting dates
import { format } from "date-fns";
// Client component that handles deletion via React Query mutation
import DeleteJobButton from './DeleteJobButton';
// Main JobCard component — displays a single job in a card layout
function JobCard({job}:{job: JobType}) {
    // Format the createdAt timestamp into MM/DD/YYYY
    const date = format(new Date(job.createdAt), "MM/dd/yyyy");

  return (
    <Card className='bg-muted'>
      {/* Header section: company + job position */}
      <CardHeader>
        {/* Company name (smaller text) */}
        <CardDescription>
          {job.company}
        </CardDescription>
        {/* Job position (title) */}
        <CardTitle>{job.position}</CardTitle>
      </CardHeader>
      {/* Divider line */}
      <Separator />
      {/* Main content grid: mode, location, date, status */}
      <CardContent className='mt-4 grid grid-cols-2 gap-4'>
        {/* Job mode (full-time, part-time, remote, etc.) */}
        <JobInfo icon={<Briefcase/>} text={job.mode} />
        {/* Job location */}
        <JobInfo icon={<MapPin />} text={job.location} />
        {/* Date the job was created */}
        <JobInfo icon={<CalendarDays />} text={date} />
        {/* Status wrapped in a badge for visual emphasis */}
        <Badge className='w-32 justify-center'>
          <JobInfo icon={<RadioTower  className='w-4 h-4'/>} text={job.status} />
        </Badge>
        </CardContent>
        {/* Footer: edit + delete buttons */}
        <CardFooter className='flex gap-4'>
         {/* Edit button navigates to the job edit page */} 
        <Button asChild size='sm'>
          <Link href={`/admin/all-jobs/${job.id}`}>edit</Link>
        </Button>
        {/* Delete button triggers React Query mutation */}
        <DeleteJobButton id={job.id} />
      </CardFooter>
    </Card>
  )
}
export default JobCard