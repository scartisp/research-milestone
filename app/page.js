import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="flex justify-center y-16">
        <SignIn routing="hash" />
      </div>
    );
  }

  return <h1>Your todos</h1>
}