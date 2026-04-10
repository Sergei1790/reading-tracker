'use client';

import { useState } from 'react';
import ReadingCard from './ReadingCard';
import type { Reading } from '@/types/reading';

const TABS = ['manhwa', 'webnovel', 'anime', 'all'] as const;
type Tab = typeof TABS[number];

export default function ReadingList({ readings }: { readings: Reading[] }) {
    const [activeTab, setActiveTab] = useState<Tab>('manhwa');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = (activeTab === 'all' ? readings : readings.filter((r) => r.type === activeTab))
        .filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
        .filter(r => statusFilter === 'all' || r.status === statusFilter);

    return (
        <section className="flex-1 w-full">
            <div className="flex w-full gap-2 mb-4 flex-wrap">
                {TABS.map((tab) => {
                    const count = tab === 'all' ? readings.length : readings.filter(r => r.type === tab).length;
                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all cursor-pointer focus:outline-none ${
                                activeTab === tab
                                    ? 'text-white shadow-lg shadow-primary/30 border border-transparent'
                                    : 'bg-card border border-transparent text-muted hover:text-foreground hover:border-primary/40'
                            }`}
                            style={activeTab === tab ? { background: 'linear-gradient(135deg, var(--color-primary), var(--color-highlight))' } : undefined}
                        >
                            {tab} <span className="ml-1 text-xs opacity-70">({count})</span>
                        </button>
                    );
                })}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 border border-white/10 bg-card text-foreground placeholder-muted rounded-xl px-3 py-2 focus:outline-none focus:border-primary/60"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-white/10 bg-card text-foreground rounded-xl px-3 py-2 focus:outline-none focus:border-primary/60 cursor-pointer"
                >
                    <option value="all">All status</option>
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                    <option value="dropped">Dropped</option>
                </select>
            </div>
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-5xl mb-4">📚</div>
                    <p className="text-muted text-lg">No {activeTab} added yet</p>
                    <p className="text-muted/50 text-sm mt-1">Add your first one above</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {filtered.map((reading) => (
                        <ReadingCard key={reading.id} reading={reading} />
                    ))}
                </ul>
            )}
        </section>
    );
}