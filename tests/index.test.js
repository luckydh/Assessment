/* eslint-env jest */

import {shallow} from 'enzyme';
import React from 'react';
import Index from "../pages";

it('should have select of adult and child for 2,3,4 disabled', () => {
    const app = shallow(<Index/>);
    app.find("select[name='adult']").forEach((node, index) => {
        //For first i.e room one expect disabled
        if (index === 0) {
            expect(node.prop('disabled')).toBe(false)
        } else {
            expect(node.prop('disabled')).toBe(true)
        }
    });
    app.find("select[name='child']").forEach((node, index) => {
        if (index === 0) {
            expect(node.prop('disabled')).toBe(false)
        } else {
            expect(node.prop('disabled')).toBe(true)
        }
    });
});
it('should enable room less than the current room', function () {
    const app = shallow(<Index/>);

    //Initially only first one is enabled
    app.find("select[name='adult']").forEach((node, index) => {
        if (index === 0) {
            expect(node.prop('disabled')).toBe(false)
        } else {
            expect(node.prop('disabled')).toBe(true)
        }
    });
    app.find("select[name='child']").forEach((node, index) => {
        if (index === 0) {
            expect(node.prop('disabled')).toBe(false)
        } else {
            expect(node.prop('disabled')).toBe(true)
        }
    });

    //After clicking last one
    app.find("input").at(3).simulate('change', {
        target: {
            name: 'roomName',
            value: 4
        }
    });
    //All should be enabled
    app.find("select[name='adult']").forEach((node, index) => {
        expect(node.prop('disabled')).toBe(false)
    });
    app.find("select[name='child']").forEach((node, index) => {
        expect(node.prop('disabled')).toBe(false)
    });
});

it('should have a selected state once checkbox is checked and vice versa', function () {
    const app = shallow(<Index/>);

    let initialSelect = app.find(".single-room").at(0).props().selected;
    app.find("input").at(0).simulate('change', {
        target: {
            name: 'roomName',
            value: 1
        }
    });
    expect(app.find(".single-room").at(0).props().selected).toBe(!initialSelect)
});


it('should should return adult and child to initial state once unchecked', function () {
    const app = shallow(<Index/>);
    //Simulate select of first room
    app.find("select[name='adult']").at(0).simulate('change', {
        target: {
            name: 'adult',
            value: 2
        }
    });
    app.find("select[name='child']").at(0).simulate('change', {
        target: {
            name: 'child',
            value: 2
        }
    });
    //Uncheck the room
    app.find("input").at(0).simulate('change', {
        target: {
            name: 'roomName',
            value: 1
        }
    });

    // console.log(app.find("select[name='child']").at(0).props().value);
    //Expect the value to be initial state
    expect(app.find("select[name='child']").at(0).props().value).toBe(0);

    expect(app.find("select[name='adult']").at(0).props().value).toBe(1);

});

it('should uncheck the rooms greater one than the current one', function () {
//Uncheck the last room
    const app = shallow(<Index/>);

    app.find("input").at(3).simulate('change', {
        target: {
            name: 'roomName',
            value: 4
        }
    });
    //Expect all room to be checked

    app.find("input").forEach((node, index) => {
        expect(node.props().checked).toBe(true)
    });

    //Uncheck the second room

    app.find("input").at(1).simulate('change', {
        target: {
            name: 'roomName',
            value: 2
        }
    });

    //Expect 3 and 4 to be unchecked


    expect(app.find('input').at(2).props().checked).toBe(false);
    expect(app.find('input').at(3).props().checked).toBe(false)


});

