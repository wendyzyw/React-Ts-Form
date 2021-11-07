import React from 'react';
import { FormContext, FormTextField } from ".";
import { shallow } from 'enzyme';

describe("component: FormTextField", function () {
    it("Should render an input element with proper attributes", function () {
        jest.spyOn(React, 'useContext').mockImplementation(() => {
            return { values: { name: 'test' }, errors: {}, setValues: null, validate: null };
        });

        const wrapper = shallow(
            <FormTextField id="name" label="Full name" type="text" required={true} />,
            {
                wrappingComponent: FormContext.Provider,
                wrappingComponentProps: { values: { name: 'test' }, errors: {}, setValues: null, validate: null }
            }
        ).dive();

        const label = wrapper.find('ForwardRef(InputLabel)');
        expect(label.prop('htmlFor')).toEqual('name');
        expect(label.text()).toEqual("Full name");

        const input = wrapper.find('#name');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
        expect(input.prop('id')).toEqual('name');
        expect(input.prop('value')).toEqual('test');
    });
})