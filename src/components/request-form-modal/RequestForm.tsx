import { Button } from "@mui/material";
import { createContext, FC, FormEvent, useState } from "react";
import { IErrors, IFormContext, IFormProps, IValidationRule, IValues } from "../../types";
import { FormTextField } from "./FormTextField";
import { requiredField } from "./validation";

/**
 * Context to allow state and functions to be shared across FormTextFields 
 */
export const FormContext = createContext<IFormContext | undefined>(undefined);

export const RequestForm: FC<IFormProps> = ({
    id,
    fields,
    submitRequest
}) => {
    const [values, setValues] = useState<IValues>({});
    const [errors, setErrors] = useState<IErrors>({});

    /**
     * perform validation rule to a specific field 
     * @param {string} fieldName 
     * @param {IValidationRule} validationRule 
     * @returns {string} 
     */
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

    /**
     * perform validation rule on an entire form checking for required fields 
     * @returns {boolean}
     */
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

    /**
     * check whether or not current form has any errors in any fields 
     * @param {IErrors} errors 
     * @returns {boolean}
     */
    const hasErrors = (errors: IErrors): boolean => {
        return Object.keys(errors).some((key: string) => (typeof errors[key]) !== 'undefined');
    }
    
    /**
     * triggered when submit button is hit 
     * @param {FormEvent} e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        
        e.preventDefault();
        if (validateForm()) {
            await submitRequest(values);
        }
    }

    const context: IFormContext = {
        values: values,
        errors: errors,
        setValues: setValues,
        validate: validateField,
    }

    return (
        <FormContext.Provider value={context}>
            <form
                id={id}
                onSubmit={handleSubmit}
                noValidate={true}
            >
                <FormTextField {...fields.name} />
                <FormTextField {...fields.email} />
                <FormTextField {...fields.confirmEmail} />
                <Button
                    data-testid="submit-btn"
                    className="form-btn"
                    disabled={hasErrors(errors)}
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </FormContext.Provider>
    )
}