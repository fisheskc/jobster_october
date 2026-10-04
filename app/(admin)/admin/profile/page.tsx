"use client";
// Marks this component as a Client Component so it can use hooks (useState, useSelector, etc.)

import { useState } from 'react';
// Reusable input component (label + input + change handler)
import FormRow from '@/components/FormRow';
// Styled wrapper for consistent dashboard form layout
import Wrapper from '@/assets/wrappers/DashboardFormPage';
import { useSelector } from 'react-redux';
// Typed Redux hooks for selecting state + dispatching actions
import { useAppDispatch, RootState } from "@/app/hooks";
// import { RootState, store } from '@/app/store';
// Toast notifications for validation + success/error feedback
import { toast } from 'react-toastify';
// The userSlice does not export updateUser; remove the broken import.
// Redux async thunk for updating user profile data
import { updateUser } from '@/features/user/userSlice';



const Profile = () => {
  // Extract user state from Redux store
  const { isLoading, user } = useSelector((state: RootState) => state.user);
  // Dispatch function for triggering Redux actions
  const dispatch = useAppDispatch();
  // const isMember = user?.isMember || false;
  // Local component state for form fields
  // Pre-populated with existing user values (or empty strings if undefined)
  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });
  // Debugging: confirms component mounted and state initialized
  console.log("Hydrated");

  // const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const { name, email, lastName, location } = userData;
  //   if (!name || !email || !lastName || !location) {
  //     toast.error('Please fill out all fields');
  //     return;
  //   }
  //   dispatch(updateUser({ name, email, lastName, location }))
  //     .unwrap()
  //     .then(() => toast.success('Profile updated'))
  //     .catch((err) => toast.error(err));
  // }

  // Generic input change handler — updates the corresponding field in userData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Form submit handler — validates fields and dispatches updateUser
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🔥 Save button fired")
    const { firstName, email, lastName, location } = userData;
    // Basic validation — ensures all fields are filled
    if (!email || !firstName || !lastName || !location) {
      toast.error('Please fill out all fields');
      return;
    }
    // Dispatch Redux async thunk to update user profile
   dispatch(updateUser({ firstName, email, lastName, location }))
      .unwrap() // Allows catching errors from the thunk
      .then(() => toast.success('Profile updated'))
      .catch((err) => toast.error(err));
  }

  return (
    <Wrapper>
       <form className="form" onSubmit={onSubmit}>
        <h2>profile</h2>
        <div className="form-center">
         <FormRow
           type="text"
           name="firstName"
           labelText="First Name"
           value={userData.firstName}
           handleChange={handleChange}
         />
         <FormRow
           type="email"
           name="email"
           labelText="Email"
           value={userData.email}
           handleChange={handleChange}
         />
         <FormRow
           type="text"
           name="lastName"
           labelText="Last Name"
           value={userData.lastName}
           handleChange={handleChange}
         />
         <FormRow
           type="text"
           name="location"
           labelText="Location"
           value={userData.location}
           handleChange={handleChange}
         />
         </div>
         <button type="submit" className="btn btn-block" disabled={isLoading}>
           {isLoading ? 'Please wait...' : 'save changes'}
         </button>
       </form>
    </Wrapper>
  )
}

export default Profile
