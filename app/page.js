import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TaskTabs from './taskTables';
import AddTaskButton from "./addTaskButton";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { dueDate: 'asc' }
  });

  const now = new Date();
  const todayStr = now.toDateString();

  const todoToday = todos.filter(t => t.dueDate.toDateString() === todayStr);
  const todoOverdue = todos.filter(t => t.dueDate < now && t.dueDate.toDateString() !== todayStr);
  const todoPending = todos.filter(t => t.dueDate > now && t.dueDate.toDateString() !== todayStr);

  return (
    <div className="max-w-315 w-full mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-[25px] uppercase">Tasks</h1>
        <AddTaskButton />
      </div>
      <TaskTabs today={todoToday} pending={todoPending} overdue={todoOverdue} />
    </div>
  );
}