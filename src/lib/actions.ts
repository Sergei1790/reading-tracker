'use server';

import {prisma} from '@/lib/prisma';
import {auth} from '@/auth';
import {revalidatePath} from 'next/cache';

export async function getReadings() {
    const session = await auth();
    if (!session?.user?.email) return [];

    const user = await prisma.user.findUnique({
        where: {email: session.user.email},
        include: { readings: { orderBy: { title: 'asc' } } },
    });

    return user?.readings ?? [];
}

export async function createReading(data: {type: string; title: string; link?: string; chapter: number; rating?: number;}) {
    const session = await auth();
    if (!session?.user?.email) throw new Error('Not authenticated');

    let user = await prisma.user.findUnique({
        where: {email: session.user.email},
    });

    if (!user) {
        user = await prisma.user.create({
            data: {email: session.user.email},
        });
    }

    await prisma.reading.create({
        data: {
            type: data.type,
            title: data.title,
            link: data.link,
            chapter: data.chapter,
            rating: data.rating,
            userId: user.id,
        },
    });

    revalidatePath('/');
}

export async function deleteReading(id: number){
    const session = await auth();
    if (!session?.user?.email) throw new Error('Not authenticated');

    await prisma.reading.delete({ where: { id } });
    revalidatePath('/');
}

export async function updateReading(id: number, data: {
    title?: string;
    type?: string;
    link?: string;
    chapter?: number;
    status?: string;
    rating?: number;
}){
    const session = await auth();
    if (!session?.user?.email) throw new Error('Not authenticated');

    await prisma.reading.update({
        where: { id }, 
        data,
    });
}