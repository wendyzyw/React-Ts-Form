import { Button } from "@mui/material";
import { createContext, FC, useState } from "react";
import { FormTextField, IFieldProps } from "./FormTextField";

export interface IFields {
    [key: string]: IFieldProps;
}

export interface IValues {
    /* key value pairs for all field values */
    [key: string]: any;
}

export interface IErrors {
    /* Validation error message for each field */
    [key: string]: string;
}

export interface IFormProps {
    /* The endpoint that the form will be posted to */ 
    endpoint?: string,
    /* All form fields */
    fields: IFields,
}

export interface IFormState {
    /* field values */
    values: IValues,
    /* field validation errors */
    errors: IErrors;
    /* whether form can be submitted successfully */
    submitSuccess?: boolean;
}

export interface IFormContext extends IFormState {
    setValues: (values: IValues) => void;

    validate: (fieldName: string) => string;
}

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

export const RequestForm: FC<IFormProps> = ({
    endpoint,
    fields
}) => {
    const [values, setValues] = useState<IValues>({});
    const [errors, setErrors] = useState<IErrors>({});

    const validate = (fieldName: string): string => {
        let error = "";
        if (
            fields[fieldName] &&
            fields[fieldName].validation
        ) {
            error = fields[fieldName].validation!.rule(
                values,
                fieldName,
                fields[fieldName].validation!.args);
        }
        errors[fieldName] = error;
        setErrors({ ...errors, [fieldName]: error });
        return error;
    }

    const context: IFormContext = {
        values: values,
        errors: errors,
        setValues: setValues,
        validate: validate,
    }

    /**
     * Return boolean indicating whether or not the current form object contains errors
     * @param {IErrors} errors - Field errors  
     */
    const hasErrors = (errors: IErrors): boolean => {
        return Object.keys(errors).some((key: string) => errors[key] !== null);
    }

    
    console.log(endpoint);

    return (
        <FormContext.Provider value={context}>
            <form
                noValidate={true}
            >
                <FormTextField {...fields.fullname} />
                <FormTextField {...fields.email} />
                <FormTextField {...fields.confirmEmail} />
                    <Button
                        disabled={hasErrors(errors)}
                        variant="contained"
                        type="submit"
                        style={{ textTransform: "none", padding: "10px 40px", width: "100%", marginTop: "20px" }}
                    >
                        Submit
                    </Button>
            </form>
        </FormContext.Provider>
    )
}