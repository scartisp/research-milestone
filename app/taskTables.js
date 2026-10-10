"use client";
import { useState } from 'react';
import { setCompleted } from './actions';
import EditTaskButton from './editTaskButton';
//styles
const tabStyle = 'px-4 py-2 rounded-md cursor-pointer bg-green-50 text-black';
const todoLiStyle = 'flex items-center gap-4 p-4 w-full border border-gray-200 rounded-md shadow-sm';
const todotitleStyle = 'flex-1 font-semibold';
const todoDateStyle = 'text-sm text-gray-400';

export default function TaskTabs({ today, pending, overdue }) {
  //state
  const [tab, setTab] = useState("today");


  const lists = { today, pending, overdue }
  const shown = lists[tab];
  const notDone = shown.filter(t => !t.completed);
  const done = shown.filter(t => t.completed);

  let notDoneContent;
  if (notDone.length === 0) {
    notDoneContent = <p className='text-center'>no tasks</p>
  } else {
    notDoneContent = (<ul className='flex flex-col max-w-250 w-full mx-auto gap-y-5'>{notDone.map(renderRow)}</ul>)
  }

  let doneContent;
  if (done.length === 0) {
    doneContent = <p className='text-center'>no tasks</p>
  } else {
    doneContent = (<ul className='flex flex-col max-w-250 w-full mx-auto gap-y-5'>{done.map(renderRow)}</ul>)
  }

  return (
    <div>
      <div className='flex row justify-self-center gap-5 mb-5'>
        <button className={`${tabStyle} ${tab === 'today' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('today')}>Today</button>
        <button className={`${tabStyle} ${tab === 'pending' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('pending')}>Pending</button>
        <button className={`${tabStyle} ${tab === 'overdue' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('overdue')}>Overdue</button>
      </div>
      <h2>To do</h2>
      {notDoneContent}
      <h2>Completed</h2>
      {doneContent}
    </div>
  )
}

function renderRow(t) {
  return (
    <li key={t.id} className={todoLiStyle}>
      <input
        className='cursor-pointer'
        type="checkbox"
        checked={t.completed}
        onChange={(e) => setCompleted(t.id, e.target.checked)}
      />
      <span className={todotitleStyle}>{t.title}</span>
      <span className={todoDateStyle}>{t.dueDate.toDateString()}</span>
      <EditTaskButton todo={t} />
    </li>
  );
}