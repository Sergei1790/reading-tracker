import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi } from 'vitest';
import StarRating from './StarRating';

describe('StarRating', () => {
    it('shows the rating value as "x/5" when value > 0',() => {
        render(<StarRating value={3} onChange={vi.fn()} />);
        expect(screen.getByText('3/5')).toBeInTheDocument();
    });

    it('Shows half-star values like "2.5/5"',() => {
        render(<StarRating value={2.5} onChange={vi.fn()} />);
        expect(screen.getByText('2.5/5')).toBeInTheDocument();
    });

    it('does NOT show "X/5" text when value is 0', () => {
        render(<StarRating value={0} onChange={vi.fn()} />);
        expect(screen.queryByText(/\/5/)).not.toBeInTheDocument();
    });
});
