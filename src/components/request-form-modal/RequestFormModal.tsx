import { FC } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

export interface RequestFormModalProps {
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void
}

export const RequestFormModal: FC<RequestFormModalProps> = ({
    modalOpen,
    setModalOpen,
}) => {
    return (
        <Dialog
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <DialogTitle>Request an invite</DialogTitle>
            <p>Form</p>
            <DialogContent>
                <TextField
                    autoFocus
                    id="fullname"
                    label="Full name"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                />
                <TextField
                    autoFocus
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                />
                <TextField
                    autoFocus
                    id="confirmEmail"
                    label="Confirm email"
                    type="email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                />
                <DialogActions>
                    <Button
                        variant="contained"
                        style={{ textTransform: "none", padding: "10px 40px", width: "100%" }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}