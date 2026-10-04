"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createJobAction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { JobStatus, JobMode } from "@/utils/types";
import FormRow from "@/components/FormRow";
import Wrapper from "@/components/RegisterPage";


// const initialState = {
//   position: "",
//   company: "",
//   location: "",
//   status: JobStatus.Pending,
//   mode: JobMode.FullTime,
// };

// type JobFormValues = typeof initialState; 

// export default function AddJobForm({action, }: {action: (formData: FormData) => Promise<void>;}) {
  export default function AddJobForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    position: "",
    company: "",
    location: "",
    status: JobStatus.Pending,
    mode: JobMode.FullTime,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to create job");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      alert("Job created!");
      // router.push("/admin/all-jobs");
      // Reset form fields
      setValues({
        position: "",
        company: "",
        location: "",
        status: JobStatus.Pending,
        mode: JobMode.FullTime,
      });
    },
  });

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate();
  }
  
  return (
    <Wrapper className='full-page'>
       <div className="bg-white/50 p-10 rounded-lg shadow-lg"> 
      <form onSubmit={handleSubmit} noValidate action="#">
        <h2 className="text-xl font-semibold mb-4">Add Job</h2>
      
        <FormRow
          type="text"
          name="position"
          labelText="Position"
          value={values.position}
          handleChange={handleChange}
        />

      <FormRow
        type="text"
        name="company"
        labelText="Company"
        value={values.company}
        handleChange={handleChange}
      />

      <FormRow
        type="text"
        name="location"
        labelText="Location"
        value={values.location}
        handleChange={handleChange}
      />

      <div>
        <label className="block mb-1">Status</label>
        <select name="status" value={values.status} onChange={handleChange} className="border p-2 rounded w-full">
          <option value={JobStatus.Pending}>Pending</option>
          <option value={JobStatus.Interview}>Interview</option>
          <option value={JobStatus.Declined}>Declined</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Job Type</label>
        <select name="mode" value={values.mode} onChange={handleChange} className="border p-2 rounded w-full">
          <option value={JobMode.FullTime}>Full-time</option>
          <option value={JobMode.PartTime}>Part-time</option>
          <option value={JobMode.Internship}>Internship</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
        Submit
      </button>
    </form>
    </div>
    </Wrapper>
  );
}