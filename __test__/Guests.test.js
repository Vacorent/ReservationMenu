import React from 'react';
import { shallow } from 'enzyme';
import Guests from '../client/src/components/Guests';

describe('Guests', () => {
  const testFunc = () => {};
  const guestTest = shallow(<Guests capacity={2} handleGuestChange={testFunc} adultCount={1} childCount={0} infantCount={0} handleCostClose={testFunc}/>);
  it('should have the correct "Guests" text', () => {
    expect(guestTest.contains('GUESTS')).toBe(true);
  })

  it('should have the correct guest count', () => {
    expect(guestTest.find('div.guestText1').length).toBe(0);
  })
})