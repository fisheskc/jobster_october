'use client';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobStatus } from '@/utils/types';

function SearchForm() { 
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const router = useRouter()
  const pathname = usePathname()

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set('page', '1'); // reset pagination
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchValue = formData.get('search') as string
    // const jobStatus = formData.get('jobStatus') as string
    // console.log(search, jobStatus)
     const params = new URLSearchParams(searchParams.toString());
    params.set('search', searchValue);
    params.set('jobStatus', jobStatus);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg" onSubmit={(handleSubmit)}>
      <Input type="text" placeholder="Search Jobs" name="search" defaultValue={search} />
      <Select defaultValue={jobStatus}
        onValueChange={(value) => updateParam('jobStatus', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value={JobStatus.Pending}>Pending</SelectItem>
          <SelectItem value={JobStatus.Interview}>Interview</SelectItem>
          <SelectItem value={JobStatus.Declined}>Declined</SelectItem>
        </SelectContent>
      </Select>
      <Button type='submit' className="mt-4 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-white">Search</Button>
    </form>
  )

}
export default SearchForm