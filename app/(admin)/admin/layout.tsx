//  "use client";

// Admin Layout (sidebar or admin navbar lives here)
// This layout wraps ONLY admin pages.
import RootNavbar from "@/components/RootNavbar";
import AdminClientWrapper from "@/components/AdminClientWrapper";
import { Separator } from '@/components/ui/separator';
// import DashboardAuthWrapper from "@/components/DashboardAuthWrapper";

// it is going to look for children, because we want to display the pages
// We do need to setup the type and children is going to be called to react.ReactNode
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
// function DashboardLayout({ children }: { children:  PropsWithChildren }) {
  // const user = await currentUser();
  //  const isAdmin = user?.publicMetadata?.role === "admin";
  console.log("ADMIN LAYOUT IS RUNNING");

  // if (!isAdmin) {
  //   redirect("/");
  // }

   // We want render the children & the sidebar
  return (
    <>
    {/* <DashboardAuthWrapper> */}
      <div className="p-4">
          <h2 className='text-2xl pl-4'>Dashboard</h2>
          <Separator className='mt-2' />
          {/* ✔ Client components are now isolated */}
          <AdminClientWrapper>
            {children}
          </AdminClientWrapper> 
       </div>
      {/* </DashboardAuthWrapper> */}
    </>
  );
}
