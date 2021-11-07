export interface IFieldProps {
    id: string;

    label: string;

    type: string;

    /* The validation rule & arg for this field */
    validation?: IValidation;
}

export interface IValidation {
    rule: (value: IValues, fieldName: string, args: any) => string | undefined;
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