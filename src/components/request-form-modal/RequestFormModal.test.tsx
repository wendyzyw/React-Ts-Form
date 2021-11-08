import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RequestFormModal } from ".";

describe("component: RequestFormModal", () => {

    const setup = () => {
        render(
            <RequestFormModal />   
        );
    }

    it("should display modal control button", () => {
        setup();
        const button = screen.getByTestId("modal-control-btn");
        expect(button).toBeInTheDocument();
    });

    it("should pop up modal and show title text", async () => {
        setup();

        const button = screen.getByTestId("modal-control-btn");
        userEvent.click(button);
        await waitFor(() => {
            expect(screen.getByTestId("modal-wrapper")).toBeInTheDocument();
            expect(screen.getByTestId("modal-title")).toHaveTextContent("Request an invite");
        });
    });

});
