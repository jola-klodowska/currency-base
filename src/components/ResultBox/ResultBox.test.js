import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';


describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            { amount: 100, result: 'PLN 100.00 = $28.57' },
            { amount: 189, result: 'PLN 189.00 = $54.00' },
            { amount: 73, result: 'PLN 73.00 = $20.86' },
            { amount: 340, result: 'PLN 340.00 = $97.14' },
        ];

        for (const testCase of testCases) {
            render(<ResultBox from="PLN" to="USD" amount={testCase.amount} />);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testCase.result);
            cleanup();
        }
    });

    it('should render proper info about conversion when USD -> PLN', () => {

        const testCases = [
            { amount: 29, result: '$29.00 = PLN 101.50' },
            { amount: 247, result: '$247.00 = PLN 864.50' },
            { amount: 13, result: '$13.00 = PLN 45.50' },
            { amount: 123, result: '$123.00 = PLN 430.50' },
        ];

        for (const testCase of testCases) {
            render(<ResultBox from="USD" to="PLN" amount={testCase.amount} />);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testCase.result);
            cleanup();
        }
    });

    it('should render the same value on both sides of the equal sign when PLN -> PLN', () => {

        const testCases = [
            { amount: 130, result: 'PLN 130.00 = PLN 130.00' },
            { amount: 70, result: 'PLN 70.00 = PLN 70.00' },
            { amount: 249, result: 'PLN 249.00 = PLN 249.00' },
            { amount: 4, result: 'PLN 4.00 = PLN 4.00' },
        ];

        for (const testCase of testCases) {
            render(<ResultBox from="PLN" to="PLN" amount={testCase.amount} />);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testCase.result);
            cleanup();
        }
    });

    it('should render "Wrong value..." when the value is less than zero', () => {

        const testCases = [
            { from: 'PLN', to: 'USD', amount: -30, result: 'Wrong value...' },
            { from: 'USD', to: 'USD', amount: -157, result: 'Wrong value...' },
            { from: 'PLN', to: 'PLN', amount: -1, result: 'Wrong value...' },
            { from: 'USD', to: 'PLN', amount: -510, result: 'Wrong value...' },
        ];

        for (const testCase of testCases) {
            render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testCase.result);
            cleanup();
        }
    });
});
