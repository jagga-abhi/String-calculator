import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StringCalculator from './StringCalculator';

describe('StringCalculator', () => {
    test('renders the calculator', () => {
        render(<StringCalculator />);
        const heading = screen.getByText(/String Calculator/i);
        expect(heading).toBeInTheDocument();
    });

    test('calculates the sum of comma-separated numbers', () => {
        render(<StringCalculator />);
        const input = screen.getByPlaceholderText(/Enter numbers here.../i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input, { target: { value: '1,2,3' } });
        fireEvent.click(button);

        const result = screen.getByText(/Result: 6/i);
        expect(result).toBeInTheDocument();
    });

    test('calculates the sum of newline-separated numbers', () => {
        render(<StringCalculator />);
        const input = screen.getByPlaceholderText(/Enter numbers here.../i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input, { target: { value: '1\n2\n3' } });
        fireEvent.click(button);

        const result = screen.getByText(/Result: 6/i);
        expect(result).toBeInTheDocument();
    });

    test('handles empty input', () => {
        render(<StringCalculator />);
        const button = screen.getByText(/Calculate/i);

        fireEvent.click(button);

        const result = screen.getByText(/Result: 0/i);
        expect(result).toBeInTheDocument();
    });

    test('throws an error for negative numbers', () => {
        render(<StringCalculator />);
        const input = screen.getByPlaceholderText(/Enter numbers here.../i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input, { target: { value: '1,-2,3' } });
        fireEvent.click(button);

        const result = screen.getByText(/negative numbers not allowed: -2/i);
        expect(result).toBeInTheDocument();
    });

    test('handles custom delimiters', () => {
        render(<StringCalculator />);
        const input = screen.getByPlaceholderText(/Enter numbers here.../i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input, { target: { value: '//;\n1;2;3' } });
        fireEvent.click(button);

        const result = screen.getByText(/Result: 6/i);
        expect(result).toBeInTheDocument();
    });
});