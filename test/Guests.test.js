import React from 'react';
import { shallow } from 'enzyme';
import Guests from '../client/src/components/Guests';

describe('Guests', () => {
  it('should have the correct text', () => {
    const guestTest = shallow(<Guests />);
    expect(guestTest.contains('GUESTS')).toBe(true);
  })
})