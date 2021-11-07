import { Button } from "@mui/material";
import { createContext, FC, FormEvent, useState } from "react";
import { IErrors, IFormContext, IFormProps, IValidationRule, IValues } from "../../types";
import { FormTextField } from "./FormTextField";
import { requiredField } from "./validation";
import config from "../../config/config.json";

/**
 * Context to allow state and functions to be shared across FormTextFields 
 */
export const FormContext = createContext<IFormContext | undefined>(undefined);

/**
 * Execute all validation rules for all fields on the form and sets the error state 
 * @returns {boolean} - a flag indicating whether form is valid 
 */
// const validateForm: boolean = () => {
//     return true;
// }

export interface ResponseError {
    errorMessage: string;
}

export type ResponseMessage = string | ResponseError;

export const RequestForm: FC<IFormProps> = ({
    endpoint,
    fields
}) => {
    const [values, setValues] = useState<IValues>({});
    const [errors, setErrors] = useState<IErrors>({});

    const [buttonText, setButtonText] = useState<string>("Submit");
    const [requestStatus, setRequestStatus] = useState<string>("idle");
    const [responseText, setResponseText] = useState<string>();
    
    const validateField = (fieldName: string, validationRule?: IValidationRule): string => {
        let error = undefined;
        if (fields[fieldName]) {
            if (validationRule) {
                error = validationRule(values, fieldName);
            } else if (fields[fieldName].validation) {
                error = fields[fieldName].validation!.rule(
                    values,
                    fieldName,
                    fields[fieldName].validation!.args);
            }
        }
        errors[fieldName] = error;
        setErrors({ ...errors, [fieldName]: error });
        return error;
    }

    const validateForm = (): boolean => {
        let hasError: boolean = false;
        Object.keys(fields).forEach((fieldName: string) => {
            if (fields[fieldName].required) {
                const error = validateField(fieldName, requiredField);
                if (typeof error !== 'undefined') hasError = true;
            }
        });
        return !hasError;
    }

    const context: IFormContext = {
        values: values,
        errors: errors,
        setValues: setValues,
        validate: validateField,
    }

    /**
     * Return boolean indicating whether or not the current form object contains errors
     * @param {IErrors} errors - Field errors  
     */
    const hasErrors = (errors: IErrors): boolean => {
        return Object.keys(errors).some((key: string) => (typeof errors[key]) !== 'undefined');
    }

    const submitRequest = async (values: IValues): Promise<ResponseMessage> => {
        setButtonText("Request being submitted...");
        setRequestStatus("started");
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: values.name, email: values.email })
        });
        if (!response.ok) {
            setButtonText("Retry");
            setRequestStatus("error");
        } else {
            setButtonText("Ok");
            setRequestStatus("success");
        }
        return await response.json();
    }

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        
        e.preventDefault();
        if (validateForm()) {
            const responseMsg = await submitRequest(values);
            if (responseMsg === config.FORM_SUBMIT_SUCCESS_MESSAGE) {
                setResponseText("Your request to invite has been submitted successfully.")
            } else {
                setResponseText(`${(responseMsg as ResponseError).errorMessage}`);
            }
        }
    }

    if (requestStatus === 'idle' || requestStatus === 'started') {
        return (
            <FormContext.Provider value={context}>
                <form
                    onSubmit={handleSubmit}
                    noValidate={true}
                >
                    <FormTextField {...fields.name} />
                    <FormTextField {...fields.email} />
                    <FormTextField {...fields.confirmEmail} />
                        <Button
                            disabled={hasErrors(errors) || requestStatus==='started'}
                            variant="contained"
                            type="submit"
                            style={{ textTransform: "none", padding: "10px 40px", width: "100%", marginTop: "20px" }}
                        >
                            {buttonText}
                        </Button>
                </form>
            </FormContext.Provider>
        )
    }
    if (requestStatus === 'error') {
        return (
            <FormContext.Provider value={context}>
                <form
                    onSubmit={handleSubmit}
                    noValidate={true}
                >
                    <p>{responseText}</p>
                    <Button
                        variant="contained"
                        style={{ textTransform: "none", padding: "10px 40px", width: "100%", marginTop: "20px" }}
                    >
                        {buttonText}
                    </Button>
                </form>
            </FormContext.Provider>
        )
    }

    return (
        <FormContext.Provider value={context}>
            <form
                onSubmit={handleSubmit}
                noValidate={true}
            >
                <p>{responseText}</p>
                <Button
                    disabled={hasErrors(errors) || requestStatus==='started'}
                    variant="contained"
                    type="submit"
                    style={{ textTransform: "none", padding: "10px 40px", width: "100%", marginTop: "20px" }}
                >
                    {buttonText}
                </Button>
            </form>
        </FormContext.Provider>
    )
}