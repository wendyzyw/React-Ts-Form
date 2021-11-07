import { IValues } from "../../types";
import { requiredField, validEmail, validLength, repeatedFieldMatches } from "./validation";

describe('The requiredField validation rule should return error message on empty/untouched field', function () {
    it('return error on undefined', function () {
        const testValues: IValues = { testField: undefined };
        let error = requiredField(testValues, 'testField');
        expect(error).toEqual("Required field");
    });

    it('return error on empty', function () {
        const testValues: IValues = { testField: "" };
        let error = requiredField(testValues, 'testField');
        expect(error).toEqual("Required field");
    });

    it('not return error on entered field', function () {
        const testValues: IValues = { testField: "test" };
        let error = requiredField(testValues, 'testField');
        expect(error).toBeUndefined();
    });
});

describe('The validEmail validation rule should validate correctly on email format', function () {
    it('return error on email address without @', function () {
        const testValues: IValues = { email: 'Abc.example.com' };
        let error = validEmail(testValues, 'email');
        expect(error).toEqual("Must be in a valid email format");
    });

    it('return error on email address with multiple @', function () {
        const testValues: IValues = { email: 'A@b@c@example.com' };
        let error = validEmail(testValues, 'email');
        expect(error).toEqual("Must be in a valid email format");
    });

    it('return error on email address with malformed quote strings', function () {
        const testValues: IValues = { email: 'just"not"right@example.com' };
        let error = validEmail(testValues, 'email');
        expect(error).toEqual("Must be in a valid email format");
    });

    it('return error on email address with special characters outside quotation mark', function () {
        const testValues: IValues = { email: `a"b(c)d,e:f;g<h>i[j\k]l@example.com}` };
        let error = validEmail(testValues, 'email');
        expect(error).toEqual("Must be in a valid email format");
    });

    it('not return error on valid email format', function () {
        const testValues: IValues = { email: "user%example.com@example.org" };
        let error = validEmail(testValues, 'email');
        expect(error).toBeUndefined();
    });
})

describe('The validLength validation rule should validate against specified allowed length', function () {
    it('return error on length not yet up to specified length', function () {
        const testValues: IValues = { name: 'ab' };
        let error = validLength(testValues, 'name', 3);
        expect(error).toEqual("Should have at least 3 characters");
    })
    
    it('not return error on length exceeding specified length', function () {
        const testValues: IValues = { name: 'abc' };
        let error = validLength(testValues, 'name', 3);
        expect(error).toBeUndefined();
    }) 
});

describe('The repeatedFieldMatches rule should check whether two field are exactly the same', function () {
    it('return error on inconsistent second field', function () {
        const testValues: IValues = { 'password': 'abcd!@#$', 'confirmedPassword': '' };
        let error = repeatedFieldMatches(testValues, 'confirmedPassword', 'password');
        expect(error).toEqual('Repeated password entered is not consistent with the previous one');
    });

    it('not return error on same second field', function () {
        const testValues: IValues = { 'password': 'abcd!@#$', 'confirmedPassword': 'abcd!@#$' };
        let error = repeatedFieldMatches(testValues, 'confirmedPassword', 'password');
        expect(error).toBeUndefined();
    });
})