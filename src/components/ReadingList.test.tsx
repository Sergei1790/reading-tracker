import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ReadingList from './ReadingList';
import type { Reading } from '@/types/reading';


// Mock next/navigation (URL state + router)
vi.mock('next/navigation', () => ({
    useSearchParams: () => new URLSearchParams(),
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
    }),
}));

// Mock ReadingCard to avoid pulling in actions/auth import chain
vi.mock('./ReadingCard', () => ({
    default: ({ reading }: { reading: Reading }) => (
        <div data-testid="reading-card">{reading.title}</div>
    ),
}));

const makeReadings = (): Reading[] => [
    { id: 1, title: 'Solo Leveling', type: 'manhwa', chapter: 100, status: 'reading', rating: 5, image: null, link: null, notes: null },
    { id: 2, title: 'Reverend Insanity', type: 'webnovel', chapter: 500, status: 'completed', rating: 5, image: null, link: null, notes: null },
    { id: 3, title: 'Frieren', type: 'anime', chapter: 28, status: 'reading', rating: 5, image: null, link: null, notes: null },
];


describe('ReadingList', () => {
    it('shows empty state when no readings of active tab', () => {
        // Default tab is 'all' — empty array means truly empty
        render(<ReadingList readings={[]} />);
        expect(screen.getByText(/no .* added yet/i)).toBeInTheDocument();
    });

    it('renders all readings on "all" tab by default', () => {
        render(<ReadingList readings={makeReadings()} />);
        // Default tab is 'all', so all 3 should show
        expect(screen.getByText('Solo Leveling')).toBeInTheDocument();
        expect(screen.getByText('Reverend Insanity')).toBeInTheDocument();
        expect(screen.getByText('Frieren')).toBeInTheDocument();
    });

    it('shows "No matches" when search has no results', async () => {
        const user = userEvent.setup();
        render(<ReadingList readings={makeReadings()} />);

        const search = screen.getByPlaceholderText(/search/i);
        await user.type(search, 'xyznothingmatches');

        expect(screen.getByText(/no matches/i)).toBeInTheDocument();
    });

    it('filters by title via search', async () => {
        const user = userEvent.setup();
        render(<ReadingList readings={makeReadings()} />);

        const search = screen.getByPlaceholderText(/search/i);
        await user.type(search, 'solo');

        expect(screen.getByText('Solo Leveling')).toBeInTheDocument();
        expect(screen.queryByText('Frieren')).not.toBeInTheDocument();
    });
});