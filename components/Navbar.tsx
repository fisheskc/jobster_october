"use client"
// import { UserButton } from '@clerk/nextjs';
// Do not import the store directly into navbar.tsxto i
// The correct way inport Redux is by importing actions & redux 

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from 'next/image';
import Logo from '../assets/images/logo.svg';
import LinksDropdown from './LinksDropDown'
import ThemeToggle from './ThemeToggle';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Container from './global/container';
// ⭐ Redux
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUser, toggleSidebar } from "@/features/user/userSlice";

// import { Container } from "lucide-react";

// import { useAppDispatch, useAppSelector } from "@/app/hooks"; 
// import { useUser } from "@clerk/nextjs";


function Navbar() {
  const { user, isLoaded } = useUser();

  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

    // Sync Clerk user → Redux & Hooks MUST run unconditionally
  useEffect(() => {
     if (isLoaded && user) {
      dispatch(
        setUser({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        })
      );
    }
 }, [isLoaded, user, dispatch]);

 // ⭐ Ensure user row exists in DB on every login/hydration
  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/user/init", { method: "POST" })
      .then(() => console.log("INIT route called"))
      .catch((err) => console.error("INIT route error:", err));
  }, [isLoaded, user]);


  // ⭐ Force re-render when Clerk hydrates
  // const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   if (isLoaded && user) {
  //      dispatch(
  //       setUser({
  //         clerkId: user.id,
  //         email: user.primaryEmailAddress?.emailAddress,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //       })
  //     );
  //     setReady(true);
  //   }
  // }, [isLoaded, user, dispatch]);

  // Hide Navbar on register/login pages
  if (pathname === "/login" || pathname === "/register") return null;

 // Prevent hydration mismatch
  if (!isLoaded) return null;

 console.log("NAVBAR RENDERED", user?.id ?? null);
// We access the user which is initially null, & so we use optional chaining
// eg - 

function toggle() {
  dispatch(toggleSidebar())
}


  return (
    <nav className="border-b">
      <div className="nav-center">
        <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
          <Image src={Logo} alt='logo' />
          <div className="flex items-center gap-4">
            <ThemeToggle /> 
            <LinksDropdown /> 
            <button
                type='button'
                className="toggle-btn"
                onClick={toggle}>
                <FaAlignLeft />
            </button>
            {/* ⭐ Example: using store.user in Navbar */}
                {userState.firstName && (
            <   p className="text-sm text-gray-500">
                  Welcome, {userState.firstName}
            </p>
          )}
          </div>
          <div className="btn-container">
          </div>
        </Container>
      </div>
   </nav>

  )
}

export default Navbar