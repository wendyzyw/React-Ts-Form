import { ResponseMessage } from "../components/request-form-modal/RequestFormModal";

export interface IFieldProps {
    id: string;

    label: string;

    type: string;

    required?: boolean;

    /* The validation rule & arg for this field */
    validation?: IValidation;
}

export type IValidationRule = (value: IValues, fieldName: string, args?: any) => string | undefined;
export interface IValidation {
    rule: IValidationRule;
    args?: any;
}

export interface IFields {
    [key: string]: IFieldProps;
}

export interface IValues {
    /* key value pairs for all field values */
    [key: string]: any;
}

export interface IErrors {
    /* Validation error message for each field */
    [key: string]: string | undefined;
}

export interface IFormProps {
    id: string,
    /* All form fields */
    fields: IFields,
    /* function to handle submit request */
    submitRequest: (values: IValues) => Promise<ResponseMessage>
}

export interface IFormState {
    /* field values */
    values: IValues,
    /* field validation errors */
    errors: IErrors;
}

export interface IFormContext extends IFormState {
    setValues: (values: IValues) => void;

    validate: (fieldName: string) => string;
}