'use client';

import {deleteReading, updateReading} from '@/lib/actions';
import {useState} from 'react';
import StarRating from './StarRating';
import type {Reading} from '@/types/reading';

const statusColors: Record<string, {dot: string; text: string}> = {
    reading: {dot: 'bg-success', text: 'text-success'},
    completed: {dot: 'bg-primary', text: 'text-primary'},
    dropped: {dot: 'bg-red-400', text: 'text-red-400'},
};

export default function ReadingCard({reading}: {reading: Reading}) {
    const [editing, setEditing] = useState(false);
    const [type, setType] = useState(reading.type);
    const [title, setTitle] = useState(reading.title);
    const [link, setLink] = useState(reading.link ?? '');
    const [chapter, setChapter] = useState(reading.chapter);
    const [status, setStatus] = useState(reading.status);
    const [rating, setRating] = useState(reading.rating ?? 0);
    const [image, setImage] = useState(reading.image ?? null);
    const [notes, setNotes] = useState(reading.notes ?? '');

    async function handleSave() {
        await updateReading(reading.id, {title, chapter, status, rating: rating || undefined, type, link: link || undefined, image: image ?? undefined, notes: notes ?? undefined});
        setEditing(false);
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        setImage(data.secure_url);
    }

    return (
        <>
            <li className="flex gap-4 items-center bg-card border border-white/10 rounded-2xl p-5 hover:border-primary/40 transition-colors">
                {image ? <img src={image} alt={title} className="w-20 h-28 rounded-xl object-cover shrink-0" /> : <div className="w-20 h-28 rounded-xl bg-accent/40 flex items-center justify-center shrink-0 text-2xl font-bold text-primary">{title.charAt(0).toUpperCase()}</div>}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="font-semibold text-foreground text-lg truncate">
                        {link ? <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{title}</a> : title}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="flex flex-col min-w-0">
                            <div className="text-sm text-muted">Chapter {chapter}</div>
                            <div className="text-sm flex items-center gap-2 mt-1">
                                <span className={`w-2 h-2 rounded-full ${statusColors[status]?.dot ?? 'bg-muted'}`} />
                                <span className={statusColors[status]?.text ?? 'text-muted'}>{status}</span>
                                {rating > 0 && <span className="text-muted">· {rating}★</span>}
                            </div>
                            <div className="flex gap-3 mt-auto pt-2">
                                <button type="button" onClick={() => setEditing(true)} className="text-primary text-sm hover:text-primary/70 transition-colors cursor-pointer">Edit</button>
                                <button type="button" onClick={() => deleteReading(reading.id)} className="text-red-400 text-sm hover:text-red-300 transition-colors cursor-pointer">Delete</button>
                            </div>
                        </div>
                        {notes && (
                            <div className="flex gap-3 flex-1 text-sm bg-bg rounded-xl p-3 line-clamp-4">
                                <span className="text-muted border-r border-white/10 pr-3">Notes:</span>
                                <span className="text-muted">{notes}</span>
                            </div>
                        )}
                    </div>
                </div>
            </li>

            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setEditing(false)}>
                    <div className="bg-card border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 space-y-3 overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <h2 className="font-semibold text-foreground text-lg">Edit</h2>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60">
                            <option value="manhwa">Manhwa</option>
                            <option value="webnovel">Webnovel</option>
                            <option value="anime">Anime</option>
                        </select>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60" />
                        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60" />
                        <input value={chapter} onChange={(e) => setChapter(Number(e.target.value))} type="number" placeholder="Chapter" className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60 appearance-none" />
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60">
                            <option value="reading">Reading</option>
                            <option value="completed">Completed</option>
                            <option value="dropped">Dropped</option>
                        </select>
                        <StarRating value={rating} onChange={setRating} />
                        <div className="flex gap-3 items-center min-w-0">
                            {image && <img src={image} alt="current" className="w-16 h-20 rounded-xl object-cover shrink-0" />}
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                                <span className="text-muted text-sm">Replace cover</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="border border-white/10 bg-bg text-muted rounded-xl px-3 py-2 w-full focus:outline-none cursor-pointer" />
                            </div>
                        </div>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" rows={3} className="border border-white/10 bg-bg text-foreground placeholder-muted rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60 resize-none" />
                        <div className="flex gap-2 items-center">
                            <button type="button" onClick={handleSave} className="bg-primary hover:bg-primary/80 text-white text-sm px-4 py-2 rounded-xl transition-colors cursor-pointer">Save</button>
                            <button type="button" onClick={() => setEditing(false)} className="text-muted hover:text-foreground text-sm px-3 py-2 transition-colors cursor-pointer">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
