'use client';

import {useState} from 'react'
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { createReading } from '@/lib/actions';
import StarRating from './StarRating';

const schema = z.object({
    type: z.enum(['manhwa', 'webnovel', 'anime']),
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-white/10 rounded-2xl p-5 space-y-3">
            <h2 className="font-semibold text-foreground text-lg">Add New</h2>

            <select {...register('type')} className="border border-white/10 bg-bg text-foreground rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60">
                <option value="manhwa">Manhwa</option>
                <option value="webnovel">Webnovel</option>
                <option value="anime">Anime</option>
            </select>

            <input {...register('title')} placeholder="Title" type="text" className="border border-white/10 bg-bg text-foreground placeholder-muted rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60" />
            {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

            <input {...register('link')} placeholder="Link (optional)" className="border border-white/10 bg-bg text-foreground placeholder-muted rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60" />

            <input {...register('chapter', { valueAsNumber: true })} type="number" placeholder="Chapter" className="appearance-none border border-white/10 bg-bg text-foreground placeholder-muted rounded-xl px-3 py-2 w-full focus:outline-none focus:border-primary/60" />

            <StarRating value={rating} onChange={setRating} />

            <button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-xl transition-colors cursor-pointer font-medium">
                Add
            </button>
        </form>
    );
}