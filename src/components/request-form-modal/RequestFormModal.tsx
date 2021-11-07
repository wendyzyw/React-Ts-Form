import { FC } from "react"
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { RequestForm } from "./RequestForm";
import { repeatedFieldMatches, validEmail, validLength } from "./validation";
import { IFields } from "../../types";

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
            required: true,
            validation: { rule: validLength, args: 3 }
        },
        email: {
            id: "email",
            label: "Email",
            type: "email",
            required: true,
            validation: { rule: validEmail }
        },
        confirmEmail: {
            id: "confirmEmail",
            label: "Confirm email",
            type: "email",
            required: true,
            validation: { rule: repeatedFieldMatches, args: "email" }
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