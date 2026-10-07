import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const { userId } = await auth();
  // if (!userId) {
  //   redirect('/sign-in');
  // }

  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: {dueDate: 'asc' }
  });
  
  return (
    <div className="max-w-325 w-full mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1>Tasks</h1>
        <button>+ Add Tasks</button>
      </div>
    </div>
  );
}