import React from 'react';
import { shallow } from "enzyme";
import { RequestForm } from ".";

describe("component: RequestForm", function () {

    let wrapper: any;
    
    beforeEach(() => {
        wrapper = shallow(
            <RequestForm fields={{ name: { id: 'name', type: 'text', label: 'Full name' } }} submitRequest={null} />
        ).dive();
    })

    it("should have text field and button component", async function () {
        const setValues = jest.fn();
        const setErrors = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation(() => [{ name: '' }, setValues]);
        useStateSpy.mockImplementation(() => [{ name: undefined }, setErrors]);

        const button = wrapper.find('#request-form-submit-btn');
        const input = wrapper.find('#name');
        expect(button).toHaveLength(1);
        expect(input).toHaveLength(1);
    });
});