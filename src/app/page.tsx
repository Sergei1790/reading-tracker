import {getReadings} from '@/lib/actions';
import AddReadingForm from '@/components/AddReadingForm';
import ReadingList from '@/components/ReadingList';
import MobileFormSheet from '@/components/MobileFormSheet';

export default async function Home() {
    const readings = await getReadings();

    return (
        <main className="min-h-screen p-6">
            <h1
                className="text-3xl font-bold mb-8 tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-highlight))' }}
            >
                My Reading List
            </h1>
            <MobileFormSheet />
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                <aside className="hidden lg:block w-72 shrink-0 lg:sticky lg:top-6">
                    <AddReadingForm />
                </aside>
                <ReadingList readings={readings} />
            </div>
        </main>
    );
}