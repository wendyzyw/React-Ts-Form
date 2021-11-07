import { FC, useReducer } from "react"
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material"
import { RequestForm, ResponseError, ResponseMessage } from "./RequestForm";
import { repeatedFieldMatches, validEmail, validLength } from "./validation";
import { IFields, IValues } from "../../types";
import config from "../../config/config.json";

export interface RequestFormModalProps {
    /* form modal state */
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void,
}

export interface IModalContentState {
    status: REQUEST_STATUS;
    /* depending on the status of async request, button & title show different text */
    titleText?: string;
    bodyText?: string;
    buttonText?: string;
    buttonAction?: () => void;
}
export interface IModalContentChangeAction {
    /* action type */
    type: ACTION_TYPE;
    /* error message */
    error?: string;
    /* success message */
    successMsg?: string;
}

export enum ACTION_TYPE {
    STARTED, SUCCESS, ERROR, RESET
}

export enum REQUEST_STATUS {
    IDLE, PENDING, SUCCESS, ERROR
}   

export const RequestFormModal: FC<RequestFormModalProps> = ({
    modalOpen,
    setModalOpen,
}) => {

    const requestStatusReducer = (
        state: IModalContentState,
        action: IModalContentChangeAction
    ): IModalContentState => {
        switch (action.type) {
            case ACTION_TYPE.ERROR: {
                return {
                    ...state,
                    status: REQUEST_STATUS.ERROR,
                    bodyText: action.error,
                    buttonText: "Retry",
                    buttonAction: () => dispatch({ type: ACTION_TYPE.RESET }),
                    titleText: "Oooop ... something seems off!",
                }
            }
            case ACTION_TYPE.SUCCESS: {
                return {
                    ...state,
                    status: REQUEST_STATUS.SUCCESS,
                    bodyText: action.successMsg,
                    buttonText: "Ok",
                    buttonAction: () => { setModalOpen(false); dispatch({ type: ACTION_TYPE.RESET }) },
                    titleText: "All done!",
                }
            }
            case ACTION_TYPE.STARTED: {
                return {
                    ...state,
                    status: REQUEST_STATUS.PENDING,
                    bodyText: "....",
                    buttonText: "Request being submitted...",
                }
            }
            case ACTION_TYPE.RESET: {
                return {
                    ...state,
                    status: REQUEST_STATUS.IDLE,
                    titleText: "Request an invite"
                }
            }
            default:
                return state;
        }
    }
    
    const [state, dispatch] = useReducer(requestStatusReducer, {
        status: REQUEST_STATUS.IDLE,
        bodyText: "",
        titleText: "Request an invite",
        buttonText: ""
    })

    const fields: IFields = {
        name: {
            id: "name",
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

    const submitRequest = async (values: IValues): Promise<ResponseMessage> => {
        dispatch({ type: ACTION_TYPE.STARTED });
        const response = await fetch(config.FORM_SUBMIT_API_ENDPOINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: values.name, email: values.email })
        });
        const msg = await response.json();
        if (!response.ok) {
            dispatch({
                type: ACTION_TYPE.ERROR,
                error: (msg as ResponseError).errorMessage
            })
        } else {
            dispatch({
                type: ACTION_TYPE.SUCCESS,
                successMsg: "Your request has been sent successfully! "
            })
        }
        return msg;
    }

    return (
        <Dialog
            open={modalOpen}
            onClose={() => {
                setModalOpen(false);
                dispatch({ type: ACTION_TYPE.RESET });
            }}
        >
            <DialogTitle>{state.titleText}</DialogTitle>
            <DialogContent>
                {
                    ( state.status === REQUEST_STATUS.IDLE ) &&
                    <RequestForm
                        fields={fields}
                        submitRequest={submitRequest}
                    />
                }
                {
                    (   state.status === REQUEST_STATUS.SUCCESS ||
                        state.status === REQUEST_STATUS.ERROR   ||
                        state.status === REQUEST_STATUS.PENDING )
                    &&
                        <div>
                            <p>{state.bodyText}</p>
                            <Button
                                disabled={state.status===REQUEST_STATUS.PENDING}
                                variant="contained"
                            style={{ textTransform: "none", padding: "10px 40px", width: "100%", marginTop: "20px" }}
                            onClick={state.buttonAction}
                            >
                                {state.buttonText}
                            </Button>
                        </div>
                }
            </DialogContent>
        </Dialog>
    )
}