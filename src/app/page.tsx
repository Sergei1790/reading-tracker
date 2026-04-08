import {getReadings} from '@/lib/actions';
import AddReadingForm from '@/components/AddReadingForm';
import ReadingList from '@/components/ReadingList';
import MobileFormSheet from '@/components/MobileFormSheet';
export default async function Home() {
    const readings = await getReadings();

    return (
        <main className="min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-8 text-blue-200 tracking-tight">My Reading List</h1>
                <MobileFormSheet />
                <div className="flex flex-col md:flex-row gap-6 items-start">
                <aside className="hidden md:block w-72 shrink-0 md:sticky md:top-6">
                    <AddReadingForm />
                </aside>
                <ReadingList readings={readings} />
            </div>       
        </main>
    );
}
