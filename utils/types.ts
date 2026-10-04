import * as z from 'zod';

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

// Replace 'any' with your actual user type - redux
export interface UserState {
  user: any;
  isLoading: boolean;
}
// Add other fields as needed
export interface RootState { user: UserState;}

export enum JobStatus {
  Pending = "Pending",
  Interview = "Interview",
  Declined = "Declined",
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}

export type smallSidebarLink = {
  text: string;
  path: string;
  id: string | number;
  icon: React.ReactNode;
}


export const createAndEditRegSchema = z.object({
  clerkId: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  // clerkId: z.string()
  // createdAt: z.date(),
  // updatedAt: z.date(),
  // limit: z.number().optional(),
});

export type CreateAndEditRegType = z.infer<typeof createAndEditRegSchema>;

// z.enum() now expects an array of string literals, not the enum object.
// z.enum() now supports TypeScript enums directly
// …but ONLY when the enum is a string enum (i.e., all values are strings). 
export const createAndEditJobSchema = z.object({
    position: z.string().min(2, {
    message: 'position must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters.',
  }),
  status: z.enum([...Object.values(JobStatus)]),
  mode: z.enum([...Object.values(JobMode)]),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;