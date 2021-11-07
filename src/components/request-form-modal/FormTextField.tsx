import { TextField } from "@mui/material";
import { FC, FormEvent, useContext } from "react";
import { FormContext, IValues } from "./RequestForm";

export interface IFieldProps {
    id: string;

    label: string;

    type: string;

    /* The validation rule & arg for this field */
    validation?: IValidation;
}

export interface IValidation {
    rule: (value: IValues, fieldName: string, args: any) => string | null;
    args?: any;
}

export const FormTextField: FC<IFieldProps> = ({
    id,
    label,
    type,
    validation=undefined
}) => {
    const { values, errors, setValues, validate } = useContext(FormContext);

    return (
        <TextField
            id={id}
            type={type}
            label={label}
            value={values[id]}
            autoFocus
            variant="outlined"
            margin="dense"
            fullWidth
            required={true}
            error={validation && errors[id]!==null}
            helperText={errors[id]!==null ? errors[id] : ""}
            onChange={
                (e: FormEvent<HTMLTextAreaElement|HTMLInputElement>) =>
                    setValues({ [id]: e.currentTarget.value })    
            }
            onBlur={() => validate(id)}
        />
    )
}