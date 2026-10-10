"use client";
import { useState } from "react";
import { updateTodo, deleteTodo } from "./actions";

// date inputs need "YYYY-MM-DD" in local time (toISOString would convert to UTC)
function toInputDate(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function EditTaskButton({ todo }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData) {
    await updateTodo(todo.id, formData);
    setOpen(false);
  }

  async function handleDelete() {
    await deleteTodo(todo.id);
    setOpen(false);
  }

  return (
    <>
      <button className="text-gray-400 cursor-pointer" onClick={() => setOpen(true)}>
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form action={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Edit Task</h2>

            <label className="flex flex-col gap-1">
              Title
              <input name="title" defaultValue={todo.title} required className="border border-gray-300 rounded-md px-3 py-2" />
            </label>

            <label className="flex flex-col gap-1">
              Deadline
              <input name="dueDate" type="date" defaultValue={toInputDate(todo.dueDate)} required className="border border-gray-300 rounded-md px-3 py-2" />
            </label>

            <div className="flex justify-between gap-2">
              <button type="button" onClick={handleDelete} className="px-4 py-2 rounded-md border border-red-600 text-red-600 cursor-pointer">
                Delete
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-md border border-green-700 text-green-700 cursor-pointer">
                  Close
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-green-700 text-white cursor-pointer">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
