'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JobStatus, JobMode, createAndEditJobSchema, CreateAndEditJobType, JobType } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CustomFormField, CustomFormSelect } from './FormComponents';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function EditJobForm({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  // 1. Fetch job data
  const { data: job, isLoading } = useQuery<JobType>({
    queryKey: ['job', jobId],
    queryFn: async () => fetch(`/api/jobs/${jobId}`).then((res) => res.json() as Promise<JobType>),
  });

  // 2. Setup form with EMPTY defaults (important!)
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  // 1. Define your form.
  // const form = useForm<CreateAndEditJobType>({
  //   resolver: zodResolver(createAndEditJobSchema),
  //   defaultValues: {
  //     position: data?.position || '',
  //     company: data?.company || '',
  //     location: data?.location || '',
  //     status: (data?.status as JobStatus) || JobStatus.Pending,
  //     mode: (data?.mode as JobMode) || JobMode.FullTime,
  //   },
  // });

   // 3. Reset form when job loads
  useEffect(() => {
  if (job && !isLoading) {
    form.reset({
      position: job.position,
      company: job.company,
      location: job.location,
      status: job.status as JobStatus,
      mode: job.mode as JobMode,
    });
  }
}, [job, isLoading, form]);


  // 4. Mutation for updating job
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      fetch(`/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then(r => r.json()),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: 'there was an error' });
        return;
      }
      toast({ description: 'job updated' });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      router.push('/admin/all-jobs');
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditJobType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate(values);
  }

  if (isLoading) return <p>Loading job...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>edit job</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
          {/* position */}
          <CustomFormField name='position' control={form.control as any} />
          {/* company */}
          <CustomFormField name='company' control={form.control as any} />
          {/* location */}
          <CustomFormField name='location' control={form.control as any} />

          {/* job status */}
          <CustomFormSelect
            name='status'
            control={form.control as any}
            labelText='job status'
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            name='mode'
            control={form.control as any}
            labelText='job mode'
            items={Object.values(JobMode)}
          />

          <Button
            type='submit'
            className='self-end capitalize'
            disabled={isPending}
          >
            {isPending ? 'updating...' : 'edit job'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default EditJobForm;