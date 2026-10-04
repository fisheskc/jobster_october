'use client'
console.log("REGISTER COMPONENT LOADED");

// This component must run on the client because it uses:
// - React state
// - Clerk legacy client-side hooks
// - Redux dispatch
// - Toast notifications
// - Router navigation

import { useState } from 'react'
import { useSignUp } from "@clerk/nextjs/legacy";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'
// import { useUser } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from '@/app/hooks'

// import { setUser } from '@/features/user/userSlice'
import FormRow from '@/components/FormRow'
import Wrapper from '@/components/RegisterPage'
// Reusable input component.


// Page layout wrapper.

// import { useClerk } from "@clerk/nextjs";
// Legacy Clerk hooks — used for client-side sign-up and sign-in flows.
// Toast notifications for user feedback.
// Redux action to store user info after registration.

type RegisterResponse = {
  success: boolean;
  register?: any;
  error?: string;
};

// Initial form values for registration.
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function Register() {
  // Form state for user input.
  const [values, setValues] = useState(initialState);

  // State for email verification step.
  // const [verificationCode, setVerificationCode] = useState('');
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [code, setCode] = useState("");
  // Clerk sign-up and sign-in hooks.

  // const { signIn, setActive } = useSignIn();
  const { isLoaded, signUp } = useSignUp();
  const clerk = useClerk();  
  // const clerk = useClerk();
  const router = useRouter()
  
  // const { user } = useUser();
  // console.log("CURRENT USER:", user);

    // ⭐ Hooks imported but not used for registration
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
    // const { userId } = await auth();
    // This prevents signed‑in users from hitting the signup page.
    // if (userId) redirect("/admin/dashboard");
    
  // console.log("Sending to API:", {
  //   firstName: values.firstName,
  //   lastName: values.lastName,
  //   email: values.email,
  //   password: values.password
  //   // clerkId: signUp.createdUserId
  // });


    // If the user is admin, we want to display the dashboard link. If not then we will not do that.
    // const isAdmin = userId === process.env.ADMIN_USER_ID;
    // We will only have one letter, basically there because we are are not affecting the state value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //  const name = e.target.name;
        //  const value = e.target.value;
        //  console.log(`${name}:${value}`)
         // Dynamically, we want to use one of these properties
         setValues({...values, [e.target.name]: e.target.value}); 
    }

  //  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setVerificationCode(e.target.value);
  //   };
    // We want to get all of the state values, we wanted to structure them from the values
    // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // A synthetic event in React is a cross-browser wrapper around the browser's native event that provides a consistent, unified API for handling user interactions across different platforms.  Unlike native DOM events, which can vary between browsers, synthetic events normalize properties and behaviors so they work identically regardless of the environment.
    const onSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log("awaitingVerification:", awaitingVerification);

         if (!isLoaded || !signUp) {
          toast.error("Clerk is still loading");
          return;
        }
        // const safeSignUp = signUp;

        const {firstName, lastName, email, password} = values
        // If all the values are missing, then we will say,
        // please fill out all of the fields
        // If there is no email or if no password
        // What we will notice, if we try to submit
        if(!email || !password || !firstName) {
            toast.error('Please fill out all fields')
             return 
        }
        //  if(isMember) {
        //     dispatch(loginUser({email:email, password: password}))
        //     return 
        // }

        //  if (!isLoaded || !signUp) {
        //   toast.error("Clerk is still loading");
        //   return;
        //   }

      try {
        // 1️⃣ Create Clerk user
        await signUp.create({
            emailAddress: email,
            password,
            firstName,
            lastName,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
         });
        // console.log('This is signUp object', signUp);
        toast.success("Check your email for the verification code");

        // Wait for Clerk to finish sign-up
        setAwaitingVerification(true);
        } catch (err) {
        console.error(err);
        toast.error('Registration failed');
      }
    };
    // ⭐ STEP 2 — Verify code + allow Clerk to auto‑sign in + hydrate + DB insert
    const verifyCode = async () => {
      if (!isLoaded || !signUp) {
        toast.error("Clerk is still loading");
        return;
      }

      // ⭐ TS now knows this is NOT undefined
      // const safeSignUp = signUp;

      try {
        const result = await signUp.attemptEmailAddressVerification({ code });
    
      // console.log("VERIFYCODE STARTED");

      // const clerkId = result.createdUserId as string;
      // const { firstName, lastName, email, password } = values;

       // MUST sign the user in before calling the API
      // const signInResult = await signIn.create({
      //   identifier: email,
      //   password,
      // })

      // await setActive({ session: signInResult.createdSessionId });

      // 3️⃣ Small delay to let the session cookie hydrate
      // await new Promise((resolve) => setTimeout(resolve, 1200));
        // ⭐ Prevent auto-login
          // Create DB record via server action
      // Insert into the DB
      // console.log("CALLING /api/createRegistration NOW");

      // ⭐ Allow Clerk to clear the cookie
      // await new Promise((resolve) => setTimeout(resolve, 200));
      if (result.status === "complete") {
        const clerkId = result.createdUserId;

      // ⭐ Prevent auto-login
      if (result.createdSessionId) {
          await clerk.signOut({ sessionId: result.createdSessionId });
      }

      // ⭐ Allow Clerk to clear session cookie
      await new Promise((resolve) => setTimeout(resolve, 200));


     const response = await fetch("/api/createRegistration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          }),
        });

    // if it is false, then it is going to be true
    // const toggleMember = () => {
    //     setValues({...values, isMember: !values.isMember});
    // }

    const data: RegisterResponse = await response.json();
    // const data = (await response.json()) as RegisterResponse;

      if (!data.success) {
        toast.error('Database registration failed');
        return;
      }

      // Sync Redux
      // dispatch(
      //   setUser({
      //     id: clerkId,
      //     email,
      //     firstName,
      //     lastName,
      //   })
      // );
       
        toast.success("Account created! Please log in.");
        // setTimeout(() => router.push('/'), 1500);
        router.push("/login");
      } else {
        toast.info("Email not verified yet. Click the link in your inbox.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Verification check failed");
    }
  };

  return (
  <Wrapper className="full-page">
      <div className="bg-white/50 p-8 rounded-lg shadow-lg">
        {/* SIGNUP FORM */}
          {!awaitingVerification && (
            <form className="space-y-4" onSubmit={onSubmit}>
              <FormRow
                type="text"
                name="firstName"
                labelText="First Name"
                value={values.firstName}
                handleChange={handleChange}
              />

              <FormRow
                type="text"
                name="lastName"
                labelText="Last Name"
                value={values.lastName}
                handleChange={handleChange}
              />

              <FormRow
                type="email"
                name="email"
                labelText="Email"
                value={values.email}
                handleChange={handleChange}
              />

              <FormRow
                type="password"
                name="password"
                labelText="Password"
                value={values.password}
                handleChange={handleChange}
              />

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                Submit
              </button>
            </form>
          )}

        {/* VERIFICATION UI */}
        {awaitingVerification && (
          <div className="space-y-4">
            <h2>Enter Verification Code</h2>
             <p className="text-sm">
              A verification link was sent to your email. Enter the code below.
            </p>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="123456"
            />

            <button
              type="button"
              onClick={verifyCode}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md">
              Verify Code
            </button>
          </div>
        )}
        <ToastContainer position="top-center" />
      </div>
    </Wrapper>
  );
}

export default Register;