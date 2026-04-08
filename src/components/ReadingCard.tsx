'use client';

import {deleteReading, updateReading} from '@/lib/actions';
import {useState} from 'react'
import StarRating from './StarRating';
import type { Reading } from '@/types/reading';

export default function ReadingCard({reading}: {reading: Reading}) {
    const [editing, setEditing] = useState(false);
    const [type, setType] = useState(reading.type);
    const [title, setTitle] = useState(reading.title);
    const [link, setLink] = useState(reading.link ?? '');
    const [chapter, setChapter] = useState(reading.chapter);
    const [status, setStatus] = useState(reading.status);
    const [rating, setRating] = useState(reading.rating ?? 0);
    const statusColors: Record<string, { dot: string; text: string }> = {
        reading: { dot: 'bg-green-400', text: 'text-green-400' },
        completed: { dot: 'bg-sky-400', text: 'text-sky-400' },
        dropped: { dot: 'bg-red-400', text: 'text-red-400' },
    };


    async function handleSave() {
        await updateReading(reading.id, { title, chapter, status, rating: rating || undefined, type, link: link || undefined });
        setEditing(false);
    }

    return (
        <li className="backdrop-blur-md bg-sky-900/80 border border-blue-500/20 rounded-xl p-5 hover:bg-sky-600/40 transition-colors">
            <div className="font-semibold text-white text-lg">
                {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                        {title}
                    </a>
                ) : (
                    title
                )}
            </div>
            <div className="text-sm text-slate-300 mt-1 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${statusColors[status]?.dot ?? 'bg-slate-400'}`} />
                Chapter {chapter} · <span className={statusColors[status]?.text ?? 'text-slate-300'}>{status}</span>
                {rating > 0 && ` · ${rating}★`}
            </div>
            <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => deleteReading(reading.id)} className="text-red-400 text-sm hover:text-red-300 transition-colors cursor-pointer">
                    Delete
                </button>
                {!editing && (
                    <button type="button" onClick={() => setEditing(true)} className="text-blue-400 text-sm hover:text-blue-300 transition-colors cursor-pointer">
                        Edit
                    </button>
                )}
            </div>
            {editing && (
                <div className="mt-3 space-y-2">
                    <div className="flex gap-2 items-center flex-wrap">
                        <select value={type} onChange={(e) => setType(e.target.value)} className="border border-blue-500/30 bg-sky-900/80 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400">
                            <option value="pornhwa">Pornhwa</option>
                            <option value="webnovel">Webnovel</option>
                            <option value="anime">Anime</option>
                        </select>
                        <input value={chapter} onChange={(e) => setChapter(Number(e.target.value))} type="number" className="border border-blue-500/30 bg-sky-900/80 text-white rounded-lg px-3 py-2 w-24 focus:outline-none focus:border-blue-400 appearance-none" />
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-blue-500/30 bg-sky-900/80 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400">
                            <option value="reading">Reading</option>
                            <option value="completed">Completed</option>
                            <option value="dropped">Dropped</option>
                        </select>
                        <StarRating value={rating} onChange={setRating} />
                    </div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border border-blue-500/30 bg-sky-900/80 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400" />
                    <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" className="border border-blue-500/30 bg-sky-900/80 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400" />
                    <div className="flex gap-2">
                        <button type="button" onClick={handleSave} className="bg-sky-600/80 hover:bg-sky-500/80 text-white text-sm px-3 py-1 rounded-lg transition-colors cursor-pointer">Save</button>
                        <button type="button" onClick={() => setEditing(false)} className="text-slate-300 hover:text-slate-200 text-sm px-3 py-1 transition-colors cursor-pointer">Cancel</button>
                    </div>
                </div>
            )}
        </li>
    );
}
