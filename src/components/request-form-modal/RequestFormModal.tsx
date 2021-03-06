import { FC, useEffect, useReducer, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material"
import { RequestForm } from "./RequestForm";
import { repeatedFieldMatches, validEmail, validLength } from "./validation";
import { IFields, IValues } from "../../types";
import config from "../../config/config.json";
import ClipLoader from "react-spinners/ClipLoader";

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

export interface ResponseError {
    /* error field from response */
    errorMessage: string;
}

export type ResponseMessage = string | ResponseError;

export const RequestFormModal: FC = () => {
    
    const [ modalOpen, setModalOpen ] = useState(false);

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
                    buttonAction: () => {
                        setModalOpen(false);
                    },
                    titleText: "All done!",
                }
            }
            case ACTION_TYPE.STARTED: {
                return {
                    ...state,
                    status: REQUEST_STATUS.PENDING,
                    titleText: "Request an invite",
                    bodyText: "",
                    buttonText: "Request being submitted...",
                }
            }
            case ACTION_TYPE.RESET: {
                return {
                    ...state,
                    status: REQUEST_STATUS.IDLE,
                    titleText: "Request an invite",
                    bodyText: ""
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

    useEffect(() => {
        if (state.status === REQUEST_STATUS.SUCCESS) {
            setTimeout(() => {
                setModalOpen(false);
            }, 2000);
        }
    }, [state, setModalOpen]);

    // with a short delay after modal is closed, reset the modal to it's original state with form 
    useEffect(() => {
        if (!modalOpen) {
            setTimeout(() => {
                dispatch({ type: ACTION_TYPE.RESET });
             }, 100);
        }
    }, [modalOpen]);

    return (
        <>
            <Button
                data-testid="modal-control-btn"
                variant="contained"
                className="button-fullwidth"
                onClick={() => setModalOpen(true)}
            >
                Request an invite
            </Button>
            <Dialog
                data-testid="modal-wrapper"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <DialogTitle data-testid="modal-title">{state.titleText}</DialogTitle>
                <DialogContent>
                    {
                        ( state.status === REQUEST_STATUS.IDLE ) &&
                        <RequestForm
                            id="modal-form"
                            fields={fields}
                            submitRequest={submitRequest}
                        />
                    }
                    {
                        (   state.status === REQUEST_STATUS.SUCCESS ||
                            state.status === REQUEST_STATUS.ERROR   ||
                            state.status === REQUEST_STATUS.PENDING )
                        &&
                            <div data-testid="modal-content">
                                <p>{state.bodyText}</p>
                                {state.status === REQUEST_STATUS.PENDING &&
                                    <div className="loader-wrapper">
                                        <ClipLoader color={"#465461"} loading={state.status === REQUEST_STATUS.PENDING} size={150} />
                                    </div>
                                }
                                <Button
                                    data-testid="modal-btn"
                                    disabled={state.status===REQUEST_STATUS.PENDING}
                                    variant="contained"
                                    className="form-btn"
                                    onClick={state.buttonAction}
                                >
                                    {state.buttonText}
                                </Button>
                            </div>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}