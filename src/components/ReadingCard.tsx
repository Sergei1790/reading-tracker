'use client';

import {deleteReading, updateReading} from '@/lib/actions';
import {useState} from 'react'
import StarRating from './StarRating';
import type { Reading } from '@/types/reading';

const statusColors: Record<string, { dot: string; text: string }> = {
    reading: { dot: 'bg-success', text: 'text-success' },
    completed: { dot: 'bg-primary', text: 'text-primary' },
    dropped: { dot: 'bg-red-400', text: 'text-red-400' },
};

export default function ReadingCard({reading}: {reading: Reading}) {
    const [editing, setEditing] = useState(false);
    const [type, setType] = useState(reading.type);
    const [title, setTitle] = useState(reading.title);
    const [link, setLink] = useState(reading.link ?? '');
    const [chapter, setChapter] = useState(reading.chapter);
    const [status, setStatus] = useState(reading.status);
    const [rating, setRating] = useState(reading.rating ?? 0);

    async function handleSave() {
        await updateReading(reading.id, { title, chapter, status, rating: rating || undefined, type, link: link || undefined });
        setEditing(false);
    }

    return (
        <li className="bg-card border border-white/10 rounded-2xl p-5 hover:border-primary/40 transition-colors">
            <div className="font-semibold text-foreground text-lg">
                {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {title}
                    </a>
                ) : (
                    title
                )}
            </div>
            <div className="text-sm text-muted mt-1 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${statusColors[status]?.dot ?? 'bg-muted'}`} />
                Chapter {chapter} · <span className={statusColors[status]?.text ?? 'text-muted'}>{status}</span>
                {rating > 0 && ` · ${rating}★`}
            </div>
            <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => deleteReading(reading.id)} className="text-red-400 text-sm hover:text-red-300 transition-colors cursor-pointer">
                    Delete
                </button>
                {!editing && (
                    <button type="button" onClick={() => setEditing(true)} className="text-primary text-sm hover:text-primary/70 transition-colors cursor-pointer">
                        Edit
                    </button>
                )}
            </div>
            {editing && (
                <div className="mt-3 space-y-2">
                    <div className="flex gap-2 items-center flex-wrap">
                        <select value={type} onChange={(e) => setType(e.target.value)} className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 focus:outline-none focus:border-primary/60">
                            <option value="manhwa">Manhwa</option>
                            <option value="webnovel">Webnovel</option>
                            <option value="anime">Anime</option>
                        </select>
                        <input value={chapter} onChange={(e) => setChapter(Number(e.target.value))} type="number" className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-24 focus:outline-none focus:border-primary/60 appearance-none" />
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 focus:outline-none focus:border-primary/60">
                            <option value="reading">Reading</option>
                            <option value="completed">Completed</option>
                            <option value="dropped">Dropped</option>
                        </select>
                        <StarRating value={rating} onChange={setRating} />
                    </div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60" />
                    <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60" />
                    <div className="flex gap-2">
                        <button type="button" onClick={handleSave} className="bg-primary hover:bg-primary/80 text-white text-sm px-3 py-1 rounded-xl transition-colors cursor-pointer">Save</button>
                        <button type="button" onClick={() => setEditing(false)} className="text-muted hover:text-foreground text-sm px-3 py-1 transition-colors cursor-pointer">Cancel</button>
                    </div>
                </div>
            )}
        </li>
    );
}