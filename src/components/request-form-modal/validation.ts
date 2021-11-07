import { IValues } from "../../types";

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

/**
 * Validate against a single field 
 * @param {IValues} values - all form values 
 * @param {string} fieldName - which field to validate against
 * @returns {string|undefined} - error msg 
 */
export const requiredField = (values: IValues, fieldName: string): string | undefined =>
    typeof values[fieldName] === 'undefined' || values[fieldName] === null || values[fieldName] === ""
        ? "Required field" : undefined;

/**
 * Validate against email validity  
 * @param {IValues} values - all form values 
 * @param {string} fieldName - which field to validate against
 * @returns {string} - error msg 
 */
export const validEmail = (values: IValues, fieldName: string): string | undefined =>
    values[fieldName] && values[fieldName].search(emailRegex)
        ? `Must be in a valid email format test` : undefined;

/**
 * Validate against field length 
 * @param {IValues} values - all form values 
 * @param {string} fieldName - which field to validate against
 * @param {number} minLen - the minimum number of chars to be valid 
 * @returns {string} - error msg 
 */
export const validLength = (values: IValues, fieldName: string, minLen: number): string | undefined =>
    values[fieldName] && values[fieldName].length < minLen
        ? `Should have at least ${minLen} characters` : undefined;

/**
 * Validate whether the repeated field matches exactly to the original field  
 * @param {IValues} values - all form values 
 * @param {string} fieldName - which field to validate against
 * @param {string} refFieldName - the name of the field that it needs to match up to  
 * @returns {string} - error msg 
 */
export const repeatedFieldMatches = (values: IValues, fieldName: string, refFieldName: string): string | undefined =>
    values[fieldName] !== values[refFieldName] 
        ? "Repeated email entered is not consistent with the previous one" : undefined;