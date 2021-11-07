import { TextField } from "@mui/material";
import { FC, FormEvent, useContext } from "react";
import { IFieldProps } from "../../types";
import { FormContext } from "./RequestForm";

export const FormTextField: FC<IFieldProps> = ({
    id,
    label,
    type,
    required=false,
    validation=null
}) => {
    const { values, errors, setValues, validate } = useContext(FormContext);

    const hasError: boolean = validation === null ? false : typeof errors[id] !== 'undefined';

    return (
        <TextField
            id={id}
            type={type}
            label={label}
            value={values[id] || ''}
            required={required}
            variant="outlined"
            margin="dense"
            fullWidth
            error={hasError}
            helperText={hasError ? errors[id] : ""}
            onChange={
                (e: FormEvent<HTMLTextAreaElement|HTMLInputElement>) =>
                    setValues({ ...values, [id]: e.currentTarget.value })    
            }
            onBlur={() => validate(id)}
        />
    )
}