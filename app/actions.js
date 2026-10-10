'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function setCompleted(id, completed) {
  const { userId } = await auth();
  await prisma.todo.updateMany({
    where: { id, userId },
    data: { completed },
  });
  revalidatePath("/");
}

export async function createTodo(formData) {
  const { userId } = await auth();
  if (!userId) return;

  await prisma.todo.create({
    data: {
      userId,
      title: formData.get("title"),
      dueDate: new Date(formData.get("dueDate") + "T00:00"),
    },
  });
  revalidatePath("/");
}

export async function updateTodo(id, formData) {
  const { userId } = await auth();
  await prisma.todo.updateMany({
    where: { id, userId },
    data: {
      title: formData.get("title"),
      dueDate: new Date(formData.get("dueDate") + "T00:00"),
    },
  });
  revalidatePath("/");
}

export async function deleteTodo(id) {
  const { userId } = await auth();
  await prisma.todo.deleteMany({
    where: { id, userId },
  });
  revalidatePath("/");
}