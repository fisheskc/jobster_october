'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './FormComponents';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
// import { use } from 'react';
// import { create } from 'domain';

function CreateJobForm() {
  // 1. Define your form.
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position:'',
      company:'',
      location:'',
      status:JobStatus.Pending,
      mode:JobMode.FullTime,
    },
  });

    const queryClient = useQueryClient();
    const {toast} = useToast()
    const router = useRouter()
    const { mutate, isPending } = useMutation({
      mutationFn: async (values: CreateAndEditJobType) => {
        const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });

      return res.json();
    },
    onSuccess: (data) => {
        if (!data) {
          toast({
            description: "there was an error",
            variant: "destructive",
          });
          return;
      }
        toast({ description: 'job created' })
        // Everytime you update something in the database,
        // whether you are invalidating the existing queries
        // otherwise, the data is going to be stuck in the cache
        queryClient.invalidateQueries({ queryKey:['jobs']})
        queryClient.invalidateQueries({ queryKey:['stats']})
        queryClient.invalidateQueries({ queryKey:['charts']})
        // form.reset() - this is an alternative if you do not want to deal with the 
        // routing
        router.push('/admin/all-jobs')
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditJobType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate(values)
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'>
        <h2 className='capitalize font-semibold text-4x1 mb-6'>
            add job
        </h2>
        <div className="grip gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
        {/* position */}
        <CustomFormField name='position' control={form.control as any} />
        {/* company */}
        <CustomFormField name='company' control={form.control as any} />
        {/* location */}
        <CustomFormField name='location' control={form.control as any} />
        {/* job status */}
        <CustomFormSelect name='status' control={form.control as any} labelText='Job status' items={Object.values(JobStatus)} />
        {/* job mode */}
        <CustomFormSelect name='mode' control={form.control as any} labelText='Job mode' items={Object.values(JobMode)} />
        
        <Button type='submit' className='self-end capitalize' disabled={isPending}>{isPending ? 'loading': 'create job'}create job</Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateJobForm;