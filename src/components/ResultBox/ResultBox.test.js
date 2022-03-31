import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';


describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            {amount: 100, result: 'PLN 100.00 = $28.57'},
            {amount: 189, result: 'PLN 189.00 = $54.00'},
            {amount: 73.50, result: 'PLN 73.50 = $21.00'},
            {amount: 340.73, result: 'PLN 340.73 = $97.35'},
        ];

        for (const testCase of testCases) {
            render(<ResultBox from="PLN" to="USD" amount={testCase.amount} />);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testCase.result);
            cleanup();
        }
    })
});