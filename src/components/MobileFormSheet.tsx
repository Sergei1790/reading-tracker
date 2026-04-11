'use client';

import {useState} from 'react';
import AddReadingForm from './AddReadingForm';

export default function MobileFormSheet() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button type="button" onClick={() => setOpen(!open)} className="w-full bg-primary hover:bg-primary/80 text-white py-3 rounded-xl text-sm font-medium cursor-pointer mb-4 lg:hidden transition-colors">
                {open ? 'Close' : '+ Add New'}
            </button>

            <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[800px] mb-4' : 'max-h-0'}`}>
                <AddReadingForm onSuccess={() => setOpen(false)} />
            </div>
        </>
    );
}