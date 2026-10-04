import Login from "./Login";

export default async function LoginPage() {
  // Get the current authenticated user from Clerk.
  // If middleware is configured correctly, this is synchronous and safe.
  // const { userId } = await auth();

  // If the user is already logged in, do NOT show the register form.
  // Redirect them to the dashboard immediately.
console.log("LOGIN PAGE RENDERED");
  // Otherwise, render the client-side registration form.
  return <Login />;
}