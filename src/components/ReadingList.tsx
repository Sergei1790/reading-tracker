'use client';

import { useState } from 'react';
import ReadingCard from './ReadingCard';
import type { Reading } from '@/types/reading';

const TABS = ['pornhwa', 'webnovel', 'anime', 'all'] as const;
type Tab = typeof TABS[number];

export default function ReadingList( {readings } : { readings: Reading[] }) {
    const [activeTab, setActiveTab] = useState<Tab>('pornhwa');
    const filtered = activeTab === 'all' ? readings : readings.filter((r) => r.type === activeTab);
    return (
        <section className="flex-1 w-full">
            <div className="flex w-full gap-2 mb-4">
                {TABS.map((tab) => {
                    const count = tab === 'all' ? readings.length : readings.filter(r => r.type === tab).length;
                    return (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${
                        activeTab === tab
                            ? 'bg-sky-600/80 text-white'
                            : 'bg-sky-950/80 border border-blue-500/20 text-slate-400 hover:text-white'
                        }`}
                    >
                        {tab} <span className="ml-1 text-xs opacity-70">({count})</span>
                    </button>
                    );
                })}
            </div>
           {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-5xl mb-4">📚</div>
                <p className="text-slate-400 text-lg">No {activeTab} added yet</p>
                <p className="text-slate-600 text-sm mt-1">Add your first one above</p>
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