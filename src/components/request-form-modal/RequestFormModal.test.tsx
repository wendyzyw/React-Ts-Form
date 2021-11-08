import { render, screen } from "@testing-library/react";
import { RequestFormModal } from ".";

describe("component: RequestFormModal", () => {

    const setModalOpenMock = jest.fn();
    const setup = () => {
        render(
            <RequestFormModal modalOpen={true} setModalOpen={setModalOpenMock} />   
        );
    }

    it("should render modal title with text", () => {
        setup();
        const title = screen.getByTestId("modal-title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Request an invite");
    });

});
