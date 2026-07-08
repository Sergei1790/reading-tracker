import {prisma} from '@/lib/prisma';

export default async function seedDemo() {
    const demoUser = await prisma.user.upsert({
        where: {email: 'demo@reading-tracker.app'},
        update: {},
        create: {email: 'demo@reading-tracker.app'},
    });
    await prisma.reading.deleteMany({where: {userId: demoUser.id}});

    await prisma.reading.createMany({
        data: [
            {
                title: 'Solo Leveling',
                type: 'manhwa',
                chapter: 179,
                status: 'completed',
                rating: 5,
                notes: 'Art is incredible, satisfying ending.',
                userId: demoUser.id,
            },
            {
                title: 'The Beginning After the End',
                type: 'manhwa',
                chapter: 168,
                status: 'reading',
                rating: 4.5,
                userId: demoUser.id,
            },
            {
                title: 'Omniscient Reader',
                type: 'webnovel',
                chapter: 320,
                status: 'reading',
                rating: 5,
                notes: 'Best webnovel I have read.',
                userId: demoUser.id,
            },
            {
                title: 'Frieren',
                type: 'anime',
                chapter: 28,
                status: 'completed',
                rating: 5,
                notes: 'Beautiful and melancholic.',
                userId: demoUser.id,
            },
            {
                title: 'Tower of God',
                type: 'manhwa',
                chapter: 90,
                status: 'dropped',
                rating: 3,
                notes: 'Got too hard to follow.',
                userId: demoUser.id,
            },
        ],
    });
}
