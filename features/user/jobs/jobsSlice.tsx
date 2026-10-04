import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ---------------------------------------------
   Job interface — describes a single job object
   Extend this as your Prisma schema grows
------------------------------------------------ */

interface Job {
  id: string;
  position: string;
  company: string;
  status: string;
  mode: string;
  location: string;
  createdAt: string;
}

interface JobsState {
  jobs: Job[];
  isLoading: boolean;
}

/* ---------------------------------------------
   Initial Redux state for the jobs slice
------------------------------------------------ */
const initialState: JobsState = {
  jobs: [],
  isLoading: false,
};

/* ---------------------------------------------
   Async thunk: DELETE a job by ID
   - Sends DELETE request to /api/jobs/:id
   - If successful → returns jobId
   - If failure → rejects with error message
------------------------------------------------ */
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId: string, thunkAPI) => {
    try {
      // Call backend API route to delete the job  
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      // If backend returns an error, reject the thunk
      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.error || "Failed to delete job");
      }
      // Return jobId so reducer can remove it from state
      return jobId; // return the ID so reducer can remove it
    } catch (err: any) {
       // Network or unexpected error 
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
/* ---------------------------------------------
   Slice: manages jobs array + loading state
   Includes:
   - setJobs reducer (manual job list update)
   - extraReducers for deleteJob thunk lifecycle
------------------------------------------------ */
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
      /* -----------------------------------------
       setJobs — replace entire jobs array
       Useful when fetching jobs list from server
    ------------------------------------------ */
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    /* -----------------------------------------
         deleteJob.pending — request started
         Sets loading state
      ------------------------------------------ */
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      /* -----------------------------------------
         deleteJob.fulfilled — request succeeded
         Removes job from state using returned jobId
      ------------------------------------------ */
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        // Filter out deleted job
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      })
      /* -----------------------------------------
         deleteJob.rejected — request failed
         Ends loading state, error handled in component
      ------------------------------------------ */
      .addCase(deleteJob.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
/* ---------------------------------------------
   Export actions + reducer
------------------------------------------------ */
export const { setJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
