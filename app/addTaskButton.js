"use client";
import { useState } from "react";
import { createTodo } from "./actions";

export default function AddTaskButton() {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData) {
    await createTodo(formData);
    setOpen(false);
  }

  return (
    <>
      <button className="px-4 py-2 rounded-md bg-green-700 text-white cursor-pointer" onClick={() => setOpen(true)}>
        + Add Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form action={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">New Task</h2>

            <label className="flex flex-col gap-1">
              Title
              <input name="title" required className="border border-gray-300 rounded-md px-3 py-2" />
            </label>

            <label className="flex flex-col gap-1">
              Deadline
              <input name="dueDate" type="date" required className="border border-gray-300 rounded-md px-3 py-2" />
            </label>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-md border border-green-700 text-green-700 cursor-pointer">
                Close
              </button>
              <button type="submit" className="px-4 py-2 rounded-md bg-green-700 text-white cursor-pointer">
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}