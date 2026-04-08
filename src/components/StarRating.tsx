'use client';

import { useState } from 'react';

interface Props {
    value: number;
    onChange: (val:number) => void;
}

export default function StarRating ({ value, onChange }: Props){
    const [hovered, setHovered] = useState<number | null>(null);

    const display = hovered ?? value;

    return(
        <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((star) =>(
                <div key={star} className='relative w-6 h-8 cursor-pointer flex items-center justify-center'>
                    {/* left half */}
                    <div 
                        className='absolute left-0 top-0 w-1/2 h-full z-10'
                        onMouseEnter={() => setHovered(star - 0.5)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => onChange(star - 0.5)}
                    />
                    {/* right half */}
                    <div
                        className="absolute right-0 top-0 w-1/2 h-full z-10"
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => onChange(star)}
                    />
                    {/* star visual */}
                   <span className="absolute inset-0 flex items-center justify-center text-2xl select-none">
                        {display >= star ? (
                            <span className="text-orange-400">★</span>
                        ) : display >= star - 0.5 ? (
                            <span className="relative inline-block text-slate-300">
                            ★
                            <span className="absolute inset-0 overflow-hidden w-1/2 text-orange-400">★</span>
                            </span>
                        ) : (
                            <span className="text-slate-300">★</span>
                        )}
                    </span>
                </div>
            ))}
            {value > 0 && (
                <span className="text-sm text-gray-500 self-center ml-1">{value}/5</span>
            )}
        </div>
    );
}