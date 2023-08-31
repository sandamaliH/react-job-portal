import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/alljobs/allJobsSlice";

export const store = configureStore({
    reducer: {
        user: userSlice, // for the user data
        job: jobSlice, // for the job data
        allJobs: allJobsSlice // for all jobs
    },
});
