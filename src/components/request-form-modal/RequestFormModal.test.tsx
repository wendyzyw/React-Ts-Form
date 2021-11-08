import { render, screen } from "@testing-library/react";
import { RequestFormModal } from ".";

describe("component: RequestFormModal", () => {

    const setup = () => {
        render(
            <RequestFormModal />   
        );
    }

    it("should render modal title with text", () => {
        setup();
        const title = screen.getByTestId("modal-title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Request an invite");
    });

});
