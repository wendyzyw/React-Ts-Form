import { RequestForm } from ".";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("component: RequestForm", function () {

    it("should call submitRequest if bypassing validation", async () => {
        const mockSubmitRequest = jest.fn();
        const mockProps = {
            id: "test",
            fields: { name: { id: 'name', type: 'text', label: 'Full name' } },
            submitRequest: mockSubmitRequest
        };
        render(
            <RequestForm {...mockProps} />
        );

        userEvent.click(screen.getByTestId("submit-btn"));
        await waitFor(() => {
            expect(mockProps.submitRequest).toHaveBeenCalledTimes(1);
        });
    });

    it ("should render supplied input fields", () => {
        const mockSubmitRequest = jest.fn();
        const mockProps = {
            id: "test",
            fields: { email: { id: 'email', type: 'email', label: 'Email' } },
            submitRequest: mockSubmitRequest
        };
        render(
            <RequestForm {...mockProps} />
        );
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });
});