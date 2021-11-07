import { TextField } from "@mui/material";
import { FC, FormEvent, useContext } from "react";
import { IFieldProps } from "../../types";
import { FormContext } from "./RequestForm";

export const FormTextField: FC<IFieldProps> = ({
    id,
    label,
    type,
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
            autoFocus
            variant="outlined"
            margin="dense"
            fullWidth
            required={true}
            error={hasError}
            helperText={hasError ? errors[id] : ""}
            onChange={
                (e: FormEvent<HTMLTextAreaElement|HTMLInputElement>) =>
                    setValues({ [id]: e.currentTarget.value })    
            }
            onBlur={() => validate(id)}
        />
    )
}