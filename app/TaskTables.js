"use client";
import { useState } from 'react';

export default function TaskTabs({ today, pending, overdue }) {
  const [tab, setTab] = useState("today");

  const lists = { today, pending, overdue }
  const shown = lists[tab];

  let content;
  if (shown.length === 0) {
    content = <p>No tasks</p>
  } else {
    content = (
      <ul>
        {shown.map(t => (
          <li key={t.id}>
            {t.title}: {t.dueDate.toLocaleDateString()}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <button onClick={() => setTab('today')}>Today</button>
      <button onClick={() => setTab('pending')}>Pending</button>
      <button onClick={() => setTab('overdue')}>Overdue</button>
      {content}
    </div>
  )

}