"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/user/userSlice";

import FormRow from "@/components/FormRow";
import Wrapper from "@/components/RegisterPage";

export default function LoginPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn, isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

 const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const { signOut } = useClerk();
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

   // ⭐ Redirect authenticated users away from login
  if (userLoaded && isSignedIn) {
    // router.push("/");
    router.push("/admin/stats");
    return null;
  }

//  console.log("CUSTOM LOGIN PAGE RENDERED");

  const onSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();

    if (!isLoaded || !signIn) {
      toast.error("Clerk is still loading");
      return;
    }

    const { email, password } = values;

    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
        const result = await signIn.create({
        identifier: email,
        password,
    });

    if (result.status === "complete") {
      // WITHOUT this,, LOGIN NEVER WORKS
      await setActive({ session: result.createdSessionId });

      // ⭐ Allow Clerk time to hydrate the session cookie
      // await new Promise((resolve) => setTimeout(resolve, 1200));

       // ⭐ Store user in Redux
      // const userId = result.createdSessionId ?? "";

      // ⭐ Store user in Redux + localStorage
      dispatch(
        setUser({
          email,
          clerkId: result.createdSessionId,
        })
      );

      toast.success("Logged in successfully");
       router.push("/");
    } else {
        toast.error("Login incomplete. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    }
  }

  return (

    <Wrapper className="full-page">
        <div className="bg-white/50 p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <form className="space-y-4" onSubmit={onSubmit}>
            <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

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
    
          {/* <button onClick={() => signOut()}>Force Sign Out</button>  */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md">
              Login
            </button>
            </form>  

            <ToastContainer position="top-center" />
        </div>
    </Wrapper>
  );
}
