import React from 'react';
import { shallow } from 'enzyme';
import Guests from '../client/src/components/Guests';

describe('Guests', () => {
  const guestTest = shallow(<Guests />);
  it('should have the correct "Guests" text', () => {
    expect(guestTest.contains('GUESTS')).toBe(true);
  })

  it('should have the correct Arrow symbol', () => {
    expect(guestTest.contains('1 guest')).toBe(true);
  })
})