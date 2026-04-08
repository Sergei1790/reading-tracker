'use client';

import {useState} from 'react'
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { createReading } from '@/lib/actions';
import StarRating from './StarRating';

const schema = z.object({
    type: z.enum(['pornhwa', 'webnovel', 'anime']),
    title: z.string().min(1, 'Title is required'),
    link: z.string().optional().or(z.literal('')),
    chapter: z.number().min(0),
});

type FormData = z.infer<typeof schema>;

export default function AddReadingForm({ onSuccess }: { onSuccess?: () => void }) {
    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: FormData) {
        await createReading({...data, rating: rating || undefined});
        reset();
        onSuccess?.();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="backdrop-blur-md bg-sky-950/80 border border-blue-500/20 rounded-xl p-5 mb-8 space-y-3">
            <h2 className="font-semibold text-blue-200 text-lg">Add New</h2>
            
            <select {...register('type')} className="border border-blue-500/30 bg-sky-900/80 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400">
                <option value="pornhwa">Pornhwa</option>
                <option value="webnovel">Webnovel</option>
                <option value="anime">Anime</option>
            </select>

            <input {...register('title')} placeholder="Title" type="text" className="border border-blue-500/30 bg-sky-900/80 text-white placeholder-slate-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400" />
            {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

            <input {...register('link')} placeholder="Link (optional)" className="border border-blue-500/30 bg-sky-900/80 text-white placeholder-slate-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400" />

            <input {...register('chapter', { valueAsNumber: true })} type="number" placeholder="Chapter" className="appearance-none border border-blue-500/30 bg-sky-900/80 text-white placeholder-slate-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400" />

            <StarRating value={rating} onChange={setRating} />

            <button type="submit" className="bg-sky-600/80 hover:bg-sky-500/80 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer w-full">
                Add
            </button>
        </form>

    );
}
