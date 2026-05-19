import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, vi } from 'vitest';
import AddReadingForm from './AddReadingForm';

vi.mock('@/lib/actions', () => ({
    createReading: vi.fn().mockResolvedValue({ ok: true }),
}));

describe('AddReadingForm', () => {
    it('renders title input, link input, and Add button', () => {
        render(<AddReadingForm />);
        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/link/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('shows "Chapter" label by default (manhwa)', () => {
        render(<AddReadingForm />);
        expect(screen.getByPlaceholderText(/chapter/i)).toBeInTheDocument();
    });

    it('shows "Episode" label when type is changed to anime', async () => {
        const user = userEvent.setup();
        render(<AddReadingForm />);

        const typeSelect = screen.getByRole('combobox');
        await user.selectOptions(typeSelect, 'anime');

        expect(screen.getByPlaceholderText(/episode/i)).toBeInTheDocument();
    });

    it('shows validation error when title is empty on submit', async () => {
        const user = userEvent.setup();
        render(<AddReadingForm />);

        await user.click(screen.getByRole('button', { name: /add/i }));

        expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    });
});
