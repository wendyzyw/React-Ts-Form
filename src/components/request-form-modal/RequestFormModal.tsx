import { FC } from "react"
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { IFields, RequestForm } from "./RequestForm";
import { validEmail, validLength } from "./validation";

export interface RequestFormModalProps {
    /* form modal state */
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void,
}

export const RequestFormModal: FC<RequestFormModalProps> = ({
    modalOpen,
    setModalOpen,
}) => {

    const fields: IFields = {
        fullname: {
            id: "fullname",
            label: "Full name",
            type: "text",
            validation: { rule: validLength, args: 3 }
        },
        email: {
            id: "email",
            label: "Email",
            type: "email",
            validation: { rule: validEmail }
        },
        confirmEmail: {
            id: "confirmEmail",
            label: "Confirm email",
            type: "email",
        }
    }

    return (
        <Dialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <DialogTitle>Request an invite</DialogTitle>
            <p>Form</p>
            <DialogContent>
                <RequestForm endpoint="" fields={fields} />
            </DialogContent>
        </Dialog>
    )
}