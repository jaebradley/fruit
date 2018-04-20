import React from 'react';
import { mount } from 'enzyme';

import AnotherExample from './index';

describe('AnotherExample', () => {
  it('is a div', () => {
    const example = mount(<AnotherExample />);
    expect(example.find('div').length).toEqual(1);
  });
});
