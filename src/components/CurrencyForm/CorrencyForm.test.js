import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => { }} />);
    });

    it('should run action callback with proper data on form submit', () => {

        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD' },
            { amount: 20, from: 'USD', to: 'PLN' },
            { amount: 200, from: 'PLN', to: 'USD' },
            { amount: 345, from: 'USD', to: 'PLN' },
        ];

        for (const testCase of testCases) {

            const action = jest.fn();

            // render component
            render(<CurrencyForm action={action} />);

            // find “convert” button
            const submitButton = screen.getByText('Convert');

            // find field elems
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-select');
            const toField = screen.getByTestId('to-select');

            // set test values to fields
            userEvent.type(amountField, testCase.amount.toString());
             userEvent.selectOptions(fromField, testCase.from);
            userEvent.selectOptions(toField, testCase.to);


            // simulate user click on "convert" button
            userEvent.click(submitButton);

            // check if action callback was called once
            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith(testCase);

            cleanup();
        }
    });
});