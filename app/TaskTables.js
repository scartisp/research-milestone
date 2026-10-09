"use client";
import { useState } from 'react';

export default function TaskTabs({ today, pending, overdue }) {
  //state
  const [tab, setTab] = useState("today");

  //styles
  const tabStyle = 'px-4 py-2 rounded-md cursor-pointer bg-green-50 text-black';
  const todoLiStyle = 'flex items-center gap-4 p-4 w-full border border-gray-200 rounded-md shadow-sm';
  const todotitleStyle = 'flex-1 font-semibold';
  const todoDateStyle = 'text-sm text-gray-400';
  const todoEditStyle = 'text-gray-400 cursor-pointer';
  
  const lists = { today, pending, overdue }
  const shown = lists[tab];

  let content;
  if (shown.length === 0) {
    content = <p>No tasks</p>
  } else {
    content = (
      <ul className='flex row max-w-250 w-full mx-auto gap-y-5'>
        {shown.map(t => (
          <li key={t.id} className={todoLiStyle}>
            <input type="checkbox" />
            <span className={todotitleStyle}>{t.title}</span>
            <span className={todoDateStyle}>{t.dueDate.toDateString()}</span>
            <button className={todoEditStyle}>Edit</button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <div className='flex row justify-self-center gap-5 mb-5'>
        <button className={`${tabStyle} ${tab === 'today' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('today')}>Today</button>
        <button className={`${tabStyle} ${tab === 'pending' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('pending')}>Pending</button>
        <button className={`${tabStyle} ${tab === 'overdue' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('overdue')}>Overdue</button>
      </div>
      {content}
    </div>
  )

}